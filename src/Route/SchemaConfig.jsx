/**
 * RiskManager — Schemas Management Page
 * Stack: Material Symbols Outlined (Google Font) + Tailwind CSS
 *
 * Add to index.html / _document.jsx:
 *   <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
 *   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Manrope:wght@600;700;800&display=swap" rel="stylesheet" />
 *
 * Component map
 * ─────────────────────────────────────────────────────────────
 * <Icon />              — Material Symbols Outlined wrapper
 * <SchemasPage />       — page root
 *   <PageHeader />      — title + description + "Create New Schema" CTA
 *   <StatCards />       — 4 KPI tiles
 *     <StatCard />      — single KPI tile
 *   <SchemaTable />     — toolbar + table + pagination
 *     <TableToolbar />  — title, tab filters, advanced filter btn
 *     <SchemaRow />     — single schema row
 *     <Pagination />    — prev / page numbers / next
 *   <BottomPanel />     — validation banner + health metrics
 *     <ValidationBanner />  — blue info card with audit log CTA
 *     <HealthPanel />       — parse/latency progress bars
 * ─────────────────────────────────────────────────────────────
 */

import { useState ,useCallback, useEffect } from "react";
import CreateTableModal from "../components/schema/CreateTableModal";
import TableService from "../client/tableService ";


/* ════════════════════════════════════════════════════════════════
   COMPONENT: Icon
   Renders a Material Symbols Outlined ligature icon.
   Usage: <Icon name="delete" className="text-sm text-slate-400" />
   ════════════════════════════════════════════════════════════════ */
function Icon({ name, className = "" }) {
  return (
    <span
      className={`material-symbols-outlined leading-none select-none align-middle ${className}`}
      style={{
        fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
      }}
    >
      {name}
    </span>
  );
}

/* ─── Static data ─────────────────────────────────────────────── */
const STATS = [
  {
    label: "TOTAL SCHEMAS",
    value: "24",
    valueColor: "text-[#001a48]",
    meta: { icon: "trending_up", text: "+2 this month", cls: "text-teal-600" },
    accent: null,
  },
  {
    label: "ACTIVE PIPELINES",
    value: "12",
    valueColor: "text-[#001a48]",
    meta: { icon: "sync", text: "Real-time sync", cls: "text-slate-400" },
    accent: null,
  },
  {
    label: "HEALTH STATUS",
    value: "99.8%",
    valueColor: "text-[#008080]",
    meta: { icon: "check_circle", text: "Stable", cls: "text-[#008080]" },
    accent: "border-l-4 border-[#008080]",
  },
  {
    label: "LAST DEPLOYED",
    value: "2h 14m ago",
    valueSm: true,
    valueColor: "text-[#001a48]",
    meta: {
      icon: null,
      text: "by user_system_cron",
      cls: "text-slate-400 italic",
    },
    accent: null,
  },
];

const SCHEMAS = [
  {
    name: "synthetic_policy_claims_v2",
    created: "Oct 24, 2023",
    modified: "Jan 12, 2024",
    status: "Active",
    canMakeCurrent: false,
  },
  {
    name: "underwriting_risk_v1",
    created: "Nov 02, 2023",
    modified: "Jan 05, 2024",
    status: "Inactive",
    canMakeCurrent: true,
  },
  {
    name: "client_exposure_audit_final",
    created: "Dec 15, 2023",
    modified: "Dec 20, 2023",
    status: "Inactive",
    canMakeCurrent: true,
  },
  {
    name: "reinsurance_treaty_mapping",
    created: "Jan 08, 2024",
    modified: "Jan 08, 2024",
    status: "Inactive",
    canMakeCurrent: true,
  },
];


/* ════════════════════════════════════════════════════════════════
   COMPONENT: PageHeader
   Icons : add_circle
   Tailwind: flex justify-between, typography, CTA button
   ════════════════════════════════════════════════════════════════ */
function PageHeader( {setOpen} ) {
  return (
    <div className="flex justify-between items-end mb-8">
      <div>
        <h2
          className="text-[24px] font-semibold leading-8 tracking-tight text-[#001a48] mb-1"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          Schemas Management
        </h2>
        <p className="text-[14px] text-slate-500 max-w-2xl leading-relaxed">
          Define, version, and manage structural metadata for global risk data
          ingestion. All active schemas are currently processing in the
          pipeline.
        </p>
      </div>
      {/* CTA — Material Symbol icon */}
      <button onClick={() => setOpen(true) } className="flex items-center gap-2 bg-[#008080] hover:brightness-110 text-white px-6 py-2 rounded shadow text-[15px] font-semibold transition-all whitespace-nowrap">
        {/* <Icon name="add_circle" className="text-[20px]" /> */}
        Create New Schema
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   COMPONENT: StatCard
   Icons : trending_up | sync | check_circle  (via meta.icon)
   Tailwind: white card, shadow, optional left accent border
   ════════════════════════════════════════════════════════════════ */
function StatCard({ label, value, valueColor, valueSm, meta, accent }) {
  return (
    <div
      className={`bg-white p-4 border border-slate-200 rounded shadow-sm ${accent ?? ""}`}
    >
      <p
        className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-1"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {label}
      </p>
      <h3
        className={`leading-none tracking-tight font-bold ${valueColor} ${
          valueSm ? "text-[16px] font-semibold mt-2" : "text-[30px]"
        }`}
        style={{ fontFamily: "Manrope, sans-serif" }}
      >
        {value}
      </h3>
      <div
        className={`flex items-center gap-1 mt-2 text-[12px] font-medium ${meta.cls}`}
      >
        {/* {meta.icon && <Icon name={meta.icon} className="text-[14px]" />} */}
        {meta.text}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   COMPONENT: StatCards
   Tailwind: 4-col grid
   ════════════════════════════════════════════════════════════════ */
function StatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {STATS.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   COMPONENT: TableToolbar
   Icons : filter_list
   Tailwind: flex justify-between, tab pills, filter button
   ════════════════════════════════════════════════════════════════ */
function TableToolbar({ activeTab, setActiveTab }) {
  return (
    <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h4
          className="text-[15px] font-semibold text-[#001a48]"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          Schema Repository
        </h4>
        {/* Tab filter pills */}
        <div className="flex gap-2">
          {["All", "Draft"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase transition-colors ${
                activeTab === tab
                  ? "bg-slate-200 text-slate-700"
                  : "border border-slate-200 text-slate-500 hover:bg-slate-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      {/* Advanced filter — Material Symbol */}
      <button className="flex items-center gap-2 text-[#008080] text-[15px] font-semibold hover:underline">
        {/* <Icon name="filter_list" className="text-[16px]" /> */}
        Advanced Filter
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   COMPONENT: SchemaRow
   Icons : table_chart | delete
   Tailwind: table row, hover bg, status badge, action buttons
   ════════════════════════════════════════════════════════════════ */
function SchemaRow({ schema}) {
  const isActive = schema.status === "Active";


  return (
    <tr className="hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
      {/* Schema name — Material Symbol icon */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {/* <Icon name="table_chart" className="text-[#008080] text-[20px]" /> */}
          <span className="font-bold text-[#001a48] text-[13px]">
            {schema.table_name}
          </span>
        </div>
      </td>

      {/* Created */}
      <td className="px-6 py-4 text-[13px] text-slate-500">{schema.created_at}</td>

      {/* Modified */}
      <td className="px-6 py-4 text-[13px] text-slate-500">
        {schema.created}
      </td>

      {/* Status badge */}
      <td className="px-6 py-4 text-center">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${
            schema.default
              ? "bg-teal-50 text-teal-700"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${schema.default ? "bg-teal-600" : "bg-slate-400"}`}
          />
          {schema.default ?  "Active" : "Not Active"}
        </span>
      </td>

      {/* Actions — Material Symbol icon for delete */}
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end items-center gap-3">
          <button className="px-3 py-1.5 rounded text-[11px] font-bold uppercase bg-[#002d72]/10 text-[#002d72] hover:bg-[#002d72] hover:text-white transition-all">
            Edit
          </button>
          {schema.default ? (
            <button
              disabled
              className="px-3 py-1.5 rounded text-[11px] font-bold uppercase bg-slate-200 text-slate-400 cursor-not-allowed"
            >
              Make Current
            </button>
          ) : (
            <button className="px-3 py-1.5 rounded text-[11px] font-bold uppercase bg-[#008080] text-white hover:brightness-110 shadow-sm transition-all"
            onClick={() => TableService.MakeDefaultTable(schema.id)}>
              Make Current
            </button>
          )}
          <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-all">
            {/* <Icon name="delete" className="text-[16px]" /> */}
          </button>
        </div>
      </td>
    </tr>
  );
}

/* ════════════════════════════════════════════════════════════════
   COMPONENT: Pagination
   Icons : chevron_left | chevron_right
   Tailwind: flex justify-between, page number buttons
   ════════════════════════════════════════════════════════════════ */
function Pagination() {
  const [activePage, setActivePage] = useState(1);

  return (
    <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
      <span className="text-[12px] text-slate-400">
        Showing 1 to 4 of 24 schemas
      </span>

      <div className="flex items-center gap-2">
        {/* Prev */}
        <button className="p-1 border border-slate-200 rounded bg-white text-slate-400 hover:bg-slate-50 transition-colors">
          {/* <Icon name="chevron_left" className="text-[16px]" /> */}
        </button>

        {/* Page numbers */}
        <div className="flex gap-1">
          {[1, 2, 3].map((p) => (
            <button
              key={p}
              onClick={() => setActivePage(p)}
              className={`px-2.5 py-1 text-[11px] font-bold rounded transition-colors ${
                activePage === p
                  ? "bg-[#002d72] text-white"
                  : "text-slate-500 hover:bg-slate-200"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Next */}
        <button className="p-1 border border-slate-200 rounded bg-white text-slate-400 hover:bg-slate-50 transition-colors">
          {/* <Icon name="chevron_right" className="text-[16px]" /> */}
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   COMPONENT: SchemaTable
   Composes: TableToolbar + thead + SchemaRow × n + Pagination
   Tailwind: white card, rounded-xl, overflow-hidden, shadow
   ════════════════════════════════════════════════════════════════ */
function SchemaTable() {
  const [activeTab, setActiveTab] = useState("All");
  const [tables , setTables] = useState([])
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchTables = async () => {
      const result = await TableService.GetTables();

      if (result.success) {
        setTables(result.data);
        setRefresh(prev => !prev)
      } else {
        console.log(result.message);
      }

      // setLoading(false);
    };

    fetchTables(refresh);
  }, []);


  

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <TableToolbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200">
              {[
                { label: "Schema Name", align: "" },
                { label: "Created Date", align: "" },
                { label: "Last Modified", align: "" },
                { label: "Status", align: "text-center" },
                { label: "Actions", align: "text-right" },
              ].map(({ label, align }) => (
                <th
                  key={label}
                  className={`px-6 py-3 text-[11px] font-bold tracking-widest uppercase text-slate-500 ${align}`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tables.map((s) => (
              <SchemaRow key={s.table_name} schema={s}/>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   COMPONENT: ValidationBanner
   Icons : verified_user
   Tailwind: navy gradient card, flex row, white CTA button
   ════════════════════════════════════════════════════════════════ */
function ValidationBanner() {
  return (
    <div className="col-span-2 bg-[#002d72] p-6 rounded-xl flex items-center gap-6">
      {/* Material Symbol icon in frosted circle */}
      <div className="p-4 bg-white/10 rounded-full shrink-0">
        {/* <Icon name="verified_user" className="text-white text-[36px]" /> */}
      </div>

      <div className="flex-1">
        <h4
          className="text-[16px] font-semibold text-white mb-1"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          Data Validation Protocol
        </h4>
        <p className="text-white/80 text-[13px] leading-relaxed">
          Changes to 'Active' schemas take effect across all linked ingestion
          pipelines immediately. Ensure you have run a comprehensive
          'Compatibility Test' before marking a new schema version as current.
        </p>
      </div>

      <button className="ml-auto whitespace-nowrap bg-white text-[#001a48] px-6 py-2 rounded font-bold text-[13px] shadow hover:bg-slate-100 transition-colors shrink-0">
        View Audit Log
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   COMPONENT: HealthPanel
   No icons — Tailwind teal card, progress bars
   ════════════════════════════════════════════════════════════════ */
function HealthPanel() {
  const metrics = [
    { label: "Parse Success Rate", value: "99.2%", pct: 92 },
    { label: "Mapping Latency", value: "12ms", pct: 45 },
  ];

  return (
    <div className="bg-teal-50 p-6 rounded-xl border border-teal-200">
      <h4
        className="text-[15px] font-semibold text-teal-800 mb-4"
        style={{ fontFamily: "Manrope, sans-serif" }}
      >
        Quick Schema Health
      </h4>
      <div className="space-y-4">
        {metrics.map((m) => (
          <div key={m.label}>
            <div className="flex justify-between text-[12px] mb-1.5">
              <span className="text-teal-700/70">{m.label}</span>
              <span className="font-bold text-teal-800">{m.value}</span>
            </div>
            <div className="w-full bg-teal-200/40 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#008080] h-full rounded-full transition-all duration-1000"
                style={{ width: `${m.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   COMPONENT: BottomPanel
   Composes: ValidationBanner (2 cols) + HealthPanel (1 col)
   Tailwind: 3-col grid
   ════════════════════════════════════════════════════════════════ */
function BottomPanel() {
  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
      <ValidationBanner />
      <HealthPanel />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   COMPONENT: SchemasPage  (page root)
   Composes: PageHeader + StatCards + SchemaTable + BottomPanel
   Tailwind: max-w-7xl, p-6, bg-[#f8f9fa]
   ════════════════════════════════════════════════════════════════ */
export default function SchemasPage() {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (payload) => {
    console.log(payload)
    const res = await TableService.CreateTables(
      payload.table_name,
      payload.display_name,
      payload.columns
    );

    if (res.success){
      console.log(res.message)
    }

  }

  return (
    <div
      className="min-h-screen bg-[#f8f9fa]"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div className="max-w-7xl mx-auto p-6">
        <PageHeader setOpen={setOpen} />
        <StatCards />
        <SchemaTable />
        <BottomPanel />
      </div>

      {open && (
        <CreateTableModal
          onClose={() => setOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );


}