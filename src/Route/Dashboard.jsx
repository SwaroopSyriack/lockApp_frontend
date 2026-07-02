/**
 * Lockton Data Ingestor — Dashboard
 * Stack: Material Symbols Outlined (Google Fonts) + Tailwind CSS
 *
 * Icons rendered via:  <span className="material-symbols-outlined">icon_name</span>
 * The font is loaded in index.html (or _document.js) with:
 *   <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
 *
 * Component map
 * ─────────────────────────────────────────────────────────────
 * <Icon />               — thin wrapper for material-symbols-outlined
 * <Dashboard />          — page root / layout shell
 *   <MetricCard />       — KPI summary tile (×4)
 *   <ActivityFeed />     — recent event list
 *     <ActivityItem />   — single feed row
 *   <QuickActions />     — CTA button group
 *   <SystemHealth />     — CPU / memory / latency bars
 *     <HealthBar />      — single progress bar row
 *   <HelpCard />         — documentation nudge
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useEffect } from "react";

/* ════════════════════════════════════════════════════════════════
   COMPONENT: Icon
   Tiny wrapper so we don't repeat the class string everywhere.
   Usage: <Icon name="database" className="text-blue-600 text-lg" />
   ════════════════════════════════════════════════════════════════ */
function Icon({ name, className = "" }) {
  return (
    <span className={`material-symbols-outlined leading-none select-none ${className}`}>
      {name}
    </span>
  );
}

/* ─── Static data ─────────────────────────────────────────────── */
const METRICS = [
  {
    label: "TOTAL RECORDS",
    value: "1.2M",
    change: "+14%",
    up: true,
    sub: "Across all connected clusters",
    icon: "database",
    iconCls: "text-blue-600",
    iconBg: "bg-blue-50 border-blue-100",
  },
  {
    label: "MANUAL TODAY",
    value: "450",
    change: "-2%",
    up: false,
    sub: "Validated by risk managers",
    icon: "touch_app",
    iconCls: "text-indigo-600",
    iconBg: "bg-indigo-50 border-indigo-100",
  },
  {
    label: "DB STATUS",
    value: "Online",
    change: "99.9%",
    up: true,
    isStatus: true,
    sub: "All regions healthy",
    icon: "cloud_done",
    iconCls: "text-green-700",
    iconBg: "bg-green-50 border-green-100",
  },
];

const ACTIVITIES = [
  {
    icon: "upload_file",
    iconCls: "text-blue-600",
    iconBg: "bg-blue-50 border-blue-100",
    title: "Batch Ingestion Complete",
    meta: "2m ago",
    badge: { label: "Success", cls: "text-green-700 bg-green-50 border-green-200" },
    desc: (
      <span>
        <strong className="text-[#002D72]">Brokerage-Cluster-A</strong> processed{" "}
        <strong>4,290 records</strong> with{" "}
        <span className="font-semibold text-green-600">0 errors</span>.
      </span>
    ),
  },
  {
    icon: "warning",
    iconCls: "text-amber-600",
    iconBg: "bg-amber-50 border-amber-100",
    title: "Manual Verification Required",
    meta: "14m ago",
    badge: { label: "Pending", cls: "text-amber-700 bg-amber-50 border-amber-200" },
    desc: (
      <span>
        12 records in{" "}
        <strong className="text-[#002D72]">Interval_XJ9</strong> require risk assessment review.
      </span>
    ),
  },
  {
    icon: "sync_saved_locally",
    iconCls: "text-green-600",
    iconBg: "bg-green-50 border-green-100",
    title: "Database Synchronized",
    meta: "1h ago",
    badge: { label: "Complete", cls: "text-green-700 bg-green-50 border-green-200" },
    desc: <span>Global cluster synchronization finished across <strong>4 regions</strong>.</span>,
  },
  {
    icon: "edit_square",
    iconCls: "text-purple-600",
    iconBg: "bg-purple-50 border-purple-100",
    title: "Policy Rules Updated",
    meta: "3h ago",
    badge: { label: "Info", cls: "text-purple-700 bg-purple-50 border-purple-200" },
    desc: (
      <span>
        User <strong className="text-[#002D72]">J. Doe</strong> modified ingestion logic for{" "}
        <strong>Cyber Risk</strong>.
      </span>
    ),
  },
];

const HEALTH_BARS = [
  { label: "CPU Load",     value: "24%",    pct: 24, barCls: "bg-blue-300" },
  { label: "Memory Usage", value: "4.8 GB", pct: 62, barCls: "bg-teal-300" },
  { label: "Latency",      value: "12ms",   pct: 15, barCls: "bg-green-400" },
];

const QUICK_ACTIONS = [
  { label: "Generate Data", icon: "data_exploration", cls: "bg-teal-600 hover:bg-teal-700 text-white" },
  { label: "Start Interval", icon: "timer",           cls: "border-2 border-[#002D72] text-[#002D72] hover:bg-[#002D72] hover:text-white bg-transparent" },
  { label: "Manual Upload",  icon: "backup",           cls: "bg-slate-100 hover:bg-slate-200 text-slate-600" },
];

/* ════════════════════════════════════════════════════════════════
   COMPONENT: MetricCard
   Icons : database | touch_app | bolt | cloud_done
           trending_up | trending_down
   Tailwind: card shell, flex layout, uptime bar
   ════════════════════════════════════════════════════════════════ */
function MetricCard({ m, animate, delay }) {
  return (
    <div
      className="bg-white border border-slate-200 rounded-xl p-2 shadow-sm hover:shadow-md transition-all"
      style={{
        opacity:    animate ? 1 : 0,
        transform:  animate ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 0.45s ease ${delay}ms, transform 0.45s ease ${delay}ms`,
      }}
    >
      {/* label + icon */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase" style={{ fontFamily: "Manrope, sans-serif" }}>
          {m.label}
        </span>
        {/* Material Symbol icon badge */}
        <div className={`p-1.5 rounded-lg border ${m.iconBg}`}>
          <Icon name={m.icon} className={`${m.iconCls} text-[18px]`} />
        </div>
      </div>

      {/* value + delta */}
      <div className="flex items-end gap-2">
        <span
          className={`text-[30px] font-black leading-none tracking-tight ${m.isStatus ? "text-green-700" : "text-[#001a48]"}`}
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          {m.value}
        </span>
        <span className={`flex items-center text-[11px] font-bold pb-1 ${m.up ? "text-green-600" : "text-red-500"}`}>
          {/* Material Symbol trend icon */}
          <Icon name={m.up ? "trending_up" : "trending_down"} className="text-[15px] mr-0.5" />
          {m.change}
        </span>
      </div>

      <p className="text-[12px] text-slate-400 mt-1.5">{m.sub}</p>

      {/* DB uptime bar */}
      {m.isStatus && (
        <div className="flex items-center gap-2 mt-2">
          <div className="flex-1 h-1 bg-green-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full" style={{ width: "99.9%" }} />
          </div>
          <span className="text-[10px] font-black text-green-600">99.9%</span>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   COMPONENT: ActivityItem
   Icons : upload_file | warning | sync_saved_locally | edit_square
   Tailwind: flex row, hover bg, badge pill
   ════════════════════════════════════════════════════════════════ */
function ActivityItem({ a, isLast }) {
  const [hovered, setHovered] = useState(false);
  return (
    <>
      <div
        className={`flex items-start gap-4 px-6 py-4 transition-colors ${hovered ? "bg-slate-50" : "bg-white"}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Material Symbol icon badge */}
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${a.iconBg}`}>
          <Icon name={a.icon} className={`${a.iconCls} text-[20px]`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[13px] font-bold text-[#001a48]" style={{ fontFamily: "Manrope, sans-serif" }}>
                {a.title}
              </span>
              {/* Tailwind badge pill */}
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wide ${a.badge.cls}`}>
                {a.badge.label}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap shrink-0">{a.meta}</span>
          </div>
          <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">{a.desc}</p>
        </div>
      </div>
      {!isLast && <div className="border-b border-slate-100" />}
    </>
  );
}

/* ════════════════════════════════════════════════════════════════
   COMPONENT: ActivityFeed
   Icons : update (header)
   Tailwind: card, header, dividers
   ════════════════════════════════════════════════════════════════ */
function ActivityFeed({ animate }) {
  return (
    <div
      className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm"
      style={{
        opacity:    animate ? 1 : 0,
        transform:  animate ? "translateY(0)" : "translateY(14px)",
        transition: "opacity 0.5s ease 0.36s, transform 0.5s ease 0.36s",
      }}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h2 className="flex items-center gap-2 text-[15px] font-bold text-[#001a48]" style={{ fontFamily: "Manrope, sans-serif" }}>
          {/* Material Symbol */}
          <Icon name="update" className="text-blue-600 text-[18px]" />
          Recent Activity Feed
        </h2>
        <button className="text-[12px] font-bold text-blue-700 hover:underline">View All Logs →</button>
      </div>

      {ACTIVITIES.map((a, i) => (
        <ActivityItem key={a.title} a={a} isLast={i === ACTIVITIES.length - 1} />
      ))}
    </div>
  );
}


/* ════════════════════════════════════════════════════════════════
   COMPONENT: QuickActions
   Icons : data_exploration | timer | backup | bolt (header)
   Tailwind: card, button stack
   ════════════════════════════════════════════════════════════════ */
function QuickActions({ animate }) {
  return (
    <div
      className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
      style={{
        opacity:    animate ? 1 : 0,
        transform:  animate ? "translateY(0)" : "translateY(14px)",
        transition: "opacity 0.5s ease 0.43s, transform 0.5s ease 0.43s",
      }}
    >
      <h2 className="flex items-center gap-2 text-[14px] font-black text-[#001a48] mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>
        {/* Material Symbol */}
        <Icon name="bolt" className="text-blue-600 text-[18px]" />
        Quick Actions
      </h2>

      <div className="flex flex-col gap-2.5">
        {QUICK_ACTIONS.map(({ label, icon, cls }) => (
          <button
            key={label}
            className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-[13px] font-bold transition-all ${cls}`}
          >
            {/* Material Symbol */}
            <Icon name={icon} className="text-[18px]" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   COMPONENT: HelpCard
   Icons : school
   Tailwind: card, flex row
   ════════════════════════════════════════════════════════════════ */
function HelpCard({ animate }) {
  return (
    <div
      className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center gap-3"
      style={{
        opacity:    animate ? 1 : 0,
        transform:  animate ? "translateY(0)" : "translateY(14px)",
        transition: "opacity 0.5s ease 0.58s, transform 0.5s ease 0.58s",
      }}
    >
      {/* Material Symbol icon in a Tailwind circle */}
      <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
        <Icon name="school" className="text-[#3d5ca2] text-[22px]" />
      </div>
      <div>
        <p className="text-[13px] font-bold text-[#001a48]" style={{ fontFamily: "Manrope, sans-serif" }}>
          Need assistance?
        </p>
        <p className="text-[11.5px] text-slate-400 mt-0.5">View the Data Ingestor Documentation</p>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   COMPONENT: Dashboard  (root)
   Tailwind: grid, gap, col-span, flex-col, min-h-screen
   ════════════════════════════════════════════════════════════════ */
export default function Dashboard() {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fa]" style={{ fontFamily: "Inter, sans-serif" }}>

      {/* ── Metric Cards — 4-col Tailwind grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  m-4">
        {METRICS.map((m, i) => (
          <MetricCard key={m.label} m={m} animate={animate} delay={i * 80} />
        ))}
      </div>

      {/* ── Main 3-col Tailwind grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start m-4">

        {/* ActivityFeed — 2 cols */}
        <div className="lg:col-span-2">
          <ActivityFeed animate={animate} />
        </div>

        {/* Right sidebar */}
        <div className="flex flex-col gap-4">
          
          
          <HelpCard     animate={animate} />
        </div>
      </div>
    </div>
  );
}