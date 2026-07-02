import { useState, useEffect, useCallback, useRef } from "react";
 
// ─── Constants ────────────────────────────────────────────────────────────────
 
const DATA_TYPES = [
  "TEXT", "INTEGER", "BIGINT", "FLOAT",
  "BOOLEAN", "DATE", "TIMESTAMP", "UUID", "JSONB",
];
 
const TYPE_BADGE = {
  TEXT:      "bg-blue-50 text-blue-700 border border-blue-200",
  INTEGER:   "bg-violet-50 text-violet-700 border border-violet-200",
  BIGINT:    "bg-violet-100 text-violet-900 border border-violet-300",
  FLOAT:     "bg-cyan-50 text-cyan-700 border border-cyan-200",
  BOOLEAN:   "bg-emerald-50 text-emerald-700 border border-emerald-200",
  DATE:      "bg-amber-50 text-amber-700 border border-amber-200",
  TIMESTAMP: "bg-orange-50 text-orange-700 border border-orange-200",
  UUID:      "bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-200",
  JSONB:     "bg-slate-100 text-slate-600 border border-slate-200",
};
 
const emptyColumn = () => ({
  id: crypto.randomUUID(),
  column_name: "",
  data_type: "TEXT",
  nullable: true,
  default_value: "",
});
 
const sanitize = (v) => v.toLowerCase().replace(/[^a-z0-9_]/g, "");
 
// ─── TypeBadge ────────────────────────────────────────────────────────────────
 
function TypeBadge({ type }) {
  return (
    <span className={`inline-block font-mono text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide whitespace-nowrap ${TYPE_BADGE[type] || TYPE_BADGE.TEXT}`}>
      {type}
    </span>
  );
}
 
// ─── ColumnRow ────────────────────────────────────────────────────────────────
 
function ColumnRow({ col, index, onChange, onRemove, canRemove }) {
  const set = (key, val) => onChange(col.id, key, val);
  const isEven = index % 2 === 0;
 
  return (
    <tr className={isEven ? "bg-slate-50/60" : "bg-white"}>
      {/* Column name */}
      <td className="px-3 py-2.5">
        <input
          value={col.column_name}
          onChange={(e) => set("column_name", sanitize(e.target.value))}
          placeholder="column_name"
          spellCheck={false}
          className="w-full font-mono text-[13px] text-slate-800 bg-white border border-slate-200 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all placeholder:text-slate-300"
        />
      </td>
 
      {/* Data type */}
      <td className="px-3 py-2.5">
        <div className="flex items-center gap-2">
          <select
            value={col.data_type}
            onChange={(e) => set("data_type", e.target.value)}
            className="text-[12px] text-slate-700 bg-white border border-slate-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 cursor-pointer transition-all"
          >
            {DATA_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <TypeBadge type={col.data_type} />
        </div>
      </td>
 
      {/* Nullable */}
      <td className="px-3 py-2.5 text-center">
        <label className="inline-flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={col.nullable}
            onChange={(e) => set("nullable", e.target.checked)}
            className="w-3.5 h-3.5 rounded accent-teal-600 cursor-pointer"
          />
          <span className={`text-[11px] font-semibold ${col.nullable ? "text-emerald-600" : "text-red-500"}`}>
            {col.nullable ? "Yes" : "No"}
          </span>
        </label>
      </td>
 
      {/* Default value */}
      <td className="px-3 py-2.5">
        <input
          value={col.default_value}
          onChange={(e) => set("default_value", e.target.value)}
          placeholder="NULL"
          className="w-full font-mono text-[12px] text-slate-700 bg-white border border-slate-200 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all placeholder:text-slate-300"
        />
      </td>
 
      {/* Remove */}
      <td className="px-3 py-2.5 text-center">
        <button
          onClick={() => canRemove && onRemove(col.id)}
          disabled={!canRemove}
          className={`w-6 h-6 flex items-center justify-center rounded text-base transition-all
            ${canRemove
              ? "text-red-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
              : "text-slate-200 cursor-not-allowed"
            }`}
        >
          ×
        </button>
      </td>
    </tr>
  );
}
 
// ─── CreateTableModal ─────────────────────────────────────────────────────────
 
export default function CreateTableModal({ onClose, onSubmit }) {
  const [tableName, setTableName]     = useState("");
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [columns, setColumns]         = useState([emptyColumn()]);
  const [submitting, setSubmitting]   = useState(false);
  const [error, setError]             = useState("");
  const overlayRef = useRef(null);
 
  useEffect(() => {
    const fn = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);
 
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);
 
  const addColumn    = () => setColumns((p) => [...p, emptyColumn()]);
  const removeColumn = (id) => setColumns((p) => p.filter((c) => c.id !== id));
  const updateColumn = (id, key, val) =>
    setColumns((p) => p.map((c) => (c.id === id ? { ...c, [key]: val } : c)));
 
  const handleSubmit = async () => {
    setError("");
    if (!tableName.trim())                          return setError("Table name is required.");
    if (!/^[a-z_][a-z0-9_]*$/.test(tableName))     return setError("Must start with a letter or underscore.");
    if (columns.some((c) => !c.column_name.trim())) return setError("All columns must have a name.");
    const names = columns.map((c) => c.column_name);
    if (new Set(names).size !== names.length)       return setError("Duplicate column names found.");
 
    setSubmitting(true);
    const payload = {
      table_name:   tableName.trim(),
      display_name: displayName.trim() || undefined,
      description:  description.trim() || undefined,
      columns: columns.map(({ column_name, data_type, nullable, default_value }) => ({
        column_name,
        data_type,
        nullable,
        default_value: default_value.trim() || undefined,
      })),
    };
 
    try {
      await onSubmit(payload);
      onClose();
    } catch (e) {
      setError(e.message || "Failed to create table.");
    } finally {
      setSubmitting(false);
    }
  };
 
  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && onClose()}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-[#001a48]/50 backdrop-blur-sm"
      style={{ animation: "fadeIn 0.18s ease" }}
    >
      <style>{`
        @keyframes fadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { transform:translateY(18px); opacity:0 } to { transform:translateY(0); opacity:1 } }
      `}</style>
 
      <div
        className="bg-white w-full max-w-3xl max-h-[92vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden"
        style={{ animation: "slideUp 0.22s ease", fontFamily: "'Manrope', 'Inter', sans-serif" }}
      >
 
        {/* ── Header ── */}
        <div className="bg-[#001a48] px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <p className="text-[10px] font-bold tracking-[0.08em] text-[#7EA8D8] uppercase mb-1">
              SCHEMA › TABLES › CREATE
            </p>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Create New Table
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white text-lg transition-colors cursor-pointer border-0"
          >
            ×
          </button>
        </div>
 
        {/* ── Scrollable Body ── */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
 
          {/* Table name + display name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold tracking-[0.07em] uppercase text-slate-400 mb-1.5">
                Table name (identifier) <span className="text-red-400">*</span>
              </label>
              <input
                value={tableName}
                onChange={(e) => setTableName(sanitize(e.target.value))}
                placeholder="dr_results_01"
                autoFocus
                className="w-full font-mono text-[13px] text-slate-800 bg-white border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all placeholder:text-slate-300"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Lowercase letters, numbers, underscores only
              </p>
            </div>
            <div>
              <label className="block text-[10px] font-bold tracking-[0.07em] uppercase text-slate-400 mb-1.5">
                Display name (optional)
              </label>
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Human readable name..."
                className="w-full text-[13px] text-slate-800 bg-white border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all placeholder:text-slate-300"
              />
            </div>
          </div>
 
          {/* Description */}
          <div>
            <label className="block text-[10px] font-bold tracking-[0.07em] uppercase text-slate-400 mb-1.5">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Purpose of this table in the drill testing scenario..."
              rows={2}
              className="w-full text-[13px] text-slate-800 bg-white border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all resize-none placeholder:text-slate-300 leading-relaxed"
            />
          </div>
 
          {/* Column definitions */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
 
            {/* Column section header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-200">
              <div className="flex items-center gap-2 text-[12px] font-bold text-[#001a48]">
                <span className="inline-flex items-center justify-center w-5 h-5 bg-[#001a48] rounded text-white text-[10px] font-bold select-none">
                  ≡
                </span>
                Column Definitions
                <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {columns.length + 1}
                </span>
              </div>
              <button
                onClick={addColumn}
                className="flex items-center gap-1 text-[12px] font-semibold text-slate-500 border border-slate-200 rounded-lg px-3 py-1.5 hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50/50 transition-all cursor-pointer bg-white"
              >
                <span className="text-base leading-none">+</span>
                Add column
              </button>
            </div>
 
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[560px]">
                <thead>
                  <tr className="bg-slate-50">
                    {["Column name", "Data type", "Nullable", "Default", ""].map((h) => (
                      <th
                        key={h}
                        className="px-3 py-2 text-[10px] font-bold tracking-[0.07em] uppercase text-slate-400 text-left border-b border-slate-200"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
 
                  {/* Locked ID row */}
                  <tr className="bg-slate-50/80">
                    <td className="px-3 py-2.5">
                      <span className="font-mono text-[13px] text-slate-400">id</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wide">
                        SERIAL PRIMARY KEY
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <span className="text-[11px] text-slate-400">No</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="text-[11px] text-slate-400 italic">auto-added</span>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <span className="text-slate-300 text-[13px]">🔒</span>
                    </td>
                  </tr>
 
                  {/* Editable column rows */}
                  {columns.map((col, i) => (
                    <ColumnRow
                      key={col.id}
                      col={col}
                      index={i + 1}
                      onChange={updateColumn}
                      onRemove={removeColumn}
                      canRemove={columns.length > 1}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
 
 
          {/* Best practices tip */}
          <div className="flex items-start gap-3 bg-sky-50 border border-sky-200 rounded-lg px-4 py-3">
            <span className="text-[14px] mt-0.5 flex-shrink-0">💡</span>
            <p className="text-[12px] text-sky-700 leading-relaxed m-0">
              Always include a{" "}
              <code className="bg-sky-100 text-sky-800 px-1 py-0.5 rounded font-mono text-[11px]">
                created_at
              </code>{" "}
              TIMESTAMP column for accurate failover timeline reporting. Use JSONB for complex metadata fields.
            </p>
          </div>
 
        </div>
 
        {/* ── Footer ── */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[13px] text-slate-500">
              Total columns:{" "}
              <strong className="text-[#001a48] font-bold">{columns.length + 1}</strong>
            </span>
            {error && (
              <span className="text-[12px] text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded-md font-medium">
                ⚠ {error}
              </span>
            )}
          </div>
 
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2 text-[13px] font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-2 text-[13px] font-bold text-white bg-[#008080] hover:bg-[#006e6e] disabled:bg-slate-300 disabled:cursor-not-allowed rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              {submitting ? "Creating…" : "Create Table →"}
            </button>
          </div>
        </div>
 
      </div>
    </div>
  );
}
 