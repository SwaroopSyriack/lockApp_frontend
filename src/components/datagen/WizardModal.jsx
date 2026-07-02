import { useState, useEffect, useRef } from "react";
 

 
const recentRecords = [
  { id: "f84a-92bc-1294", name: "Alexandra Vance", company: "Global Logistics Inc.", country: "UK", policy: "Cyber Risk", coverage: "$12.5M", status: "Validated", policyColor: "bg-blue-100 text-blue-900" },
  { id: "a12c-34de-5678", name: "Marcus Chen", company: "Apex Holdings Ltd.", country: "US", policy: "Property", coverage: "$8.2M", status: "Pending", policyColor: "bg-indigo-100 text-indigo-900" },
  { id: "b90f-11ab-2233", name: "Priya Nair", company: "Meridian Group", country: "IN", policy: "Liability", coverage: "$5.0M", status: "Validated", policyColor: "bg-teal-100 text-teal-900" },
];
 
const barData = [40,55,35,70,60,80,45,90,65,75,50,88,72,60,95,55,70,82,45,65,78,88,60,72,85,55,90,68,75,92];
 
// ── Step 1: Preview ──
function StepPreview({ onNext, onClose }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-8">
        <p className="text-sm text-gray-500 mb-5">
          Review the synthetic record below to ensure data mapping accuracy before proceeding to final configuration.
        </p>
 
        {/* Record Card */}
        <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
          <div className="flex justify-between items-center px-4 py-2.5 bg-gray-100 border-b border-gray-200">
            <span className="text-[11px] font-bold tracking-widest text-blue-950 uppercase">Record Preview Table</span>
            <button className="text-[11px] font-bold tracking-widest text-teal-700 hover:underline uppercase">View Raw JSON</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {["ID","Name","Company","Country","Policy Type","Coverage","Status"].map(h => (
                    <th key={h} className="px-4 py-2 text-[10px] font-bold tracking-widest text-gray-500 uppercase whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-gray-50">
                <tr className="hover:bg-gray-100 transition-colors">
                  <td className="px-4 py-3 text-[13px] font-semibold text-blue-950 font-mono">f84a-92bc-1294</td>
                  <td className="px-4 py-3 text-[13px] font-semibold text-gray-800">Alexandra Vance</td>
                  <td className="px-4 py-3 text-[13px] text-gray-500">Global Logistics Inc.</td>
                  <td className="px-4 py-3 text-[13px] text-gray-500">🌐 UK</td>
                  <td className="px-4 py-3">
                    <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-900 text-[10px] font-bold uppercase">Cyber Risk</span>
                  </td>
                  <td className="px-4 py-3 text-[13px] font-semibold text-teal-700">$12.5M</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-teal-700 uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                      Validated
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex items-center gap-1.5 px-4 py-1.5 bg-gray-100/60 text-gray-400 text-[11px]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Last updated: 2023-10-27 14:32:11 GMT
          </div>
        </div>
 
        {/* Info Alert */}
        <div className="flex items-start gap-3 p-4 bg-teal-50 border border-teal-200 rounded-lg">
          <svg className="text-teal-600 mt-0.5 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
          <div>
            <h4 className="text-sm font-semibold text-teal-800 mb-0.5">Schema Match Confirmed</h4>
            <p className="text-[13px] text-gray-500">The generated fields match the destination table schema for the 'Risk Analytics' module. Clicking Next will take you to field mapping settings.</p>
          </div>
        </div>
      </div>
 
      {/* Footer */}
      <div className="flex justify-between items-center px-8 py-4 bg-gray-50 border-t border-gray-200">
        <button onClick={onClose} className="px-5 py-2 text-gray-500 hover:bg-gray-200 rounded-lg font-semibold text-sm transition-colors">
          Cancel
        </button>
        <div className="flex gap-3">
          <button className="px-5 py-2 border border-blue-950 text-blue-950 hover:bg-blue-950/5 rounded-lg font-semibold text-sm transition-colors">
            Edit Data
          </button>
          <button
            onClick={onNext}
            className="px-5 py-2 bg-teal-700 text-white hover:bg-teal-800 rounded-lg font-semibold text-sm flex items-center gap-2 transition-colors shadow-sm"
          >
            Next
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
 
// ── Step 2: Settings ──
const INTERVALS = [
  { label: "5s", sub: "Real-time" },
  { label: "10s", sub: "Standard" },
  { label: "30s", sub: "Balanced" },
  { label: "1m", sub: "Delayed" },
];
 
function StepSettings({ onBack, onClose }) {
  const [selected, setSelected] = useState(1);
  const [autoGen, setAutoGen] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
 
  function handleSubmit() {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
      setTimeout(onClose, 1200);
    }, 1200);
  }
 
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-8 space-y-6">
        <p className="text-sm text-gray-500">Configure timing and automation for the ingestion engine.</p>
 
        {/* Frequency Selector */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold tracking-widest text-gray-400 uppercase block">Generation Interval / Frequency</label>
          <div className="grid grid-cols-4 border border-gray-200 rounded-lg overflow-hidden divide-x divide-gray-200">
            {INTERVALS.map((iv, i) => (
              <button
                key={iv.label}
                onClick={() => setSelected(i)}
                className={`py-4 flex flex-col items-center gap-1 transition-colors ${
                  selected === i
                    ? "bg-teal-100 text-teal-800"
                    : "bg-white hover:bg-gray-50 text-gray-800"
                }`}
              >
                <span className={`text-base font-semibold ${selected === i ? "text-teal-900" : "text-gray-800"}`}>{iv.label}</span>
                <span className={`text-[12px] ${selected === i ? "text-teal-700" : "text-gray-400"}`}>{iv.sub}</span>
              </button>
            ))}
          </div>
          <p className="text-[12px] text-gray-400 italic">Frequency determines how often the engine polls for new risk signals from the core database.</p>
        </div>
 
        {/* Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl">
          <div>
            <h4 className="text-sm font-semibold text-blue-950">Auto-generate continuously</h4>
            <p className="text-[13px] text-gray-400 mt-0.5">Keep the ingestion engine active until manually suspended.</p>
          </div>
          <button
            onClick={() => setAutoGen(!autoGen)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${autoGen ? "bg-teal-600" : "bg-gray-300"}`}
          >
            <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${autoGen ? "translate-x-5" : "translate-x-0.5"}`} />
          </button>
        </div>
 
        {/* Info Card */}
        <div className="flex gap-3 p-4 bg-blue-50 border border-blue-100 rounded-lg">
          <svg className="text-blue-700 mt-0.5 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <p className="text-[13px] text-blue-800">
            Setting a frequency higher than 10s may impact system performance on concurrent risk analytics tasks.
            Consult the <strong>Help Center</strong> if you encounter latency.
          </p>
        </div>
 
        {done && (
          <div className="flex items-center gap-2 p-3 bg-teal-50 border border-teal-200 rounded-lg text-teal-700 text-sm font-semibold">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Parameters applied successfully!
          </div>
        )}
      </div>
 
      {/* Footer */}
      <div className="flex justify-between items-center px-8 py-4 bg-gray-50 border-t border-gray-200">
        <button onClick={onBack} className="flex items-center gap-2 px-5 py-2 border border-blue-950 text-blue-950 hover:bg-blue-950/5 rounded-lg text-[11px] font-bold tracking-widest uppercase transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={submitting || done}
          className="flex items-center gap-2 px-5 py-2 bg-blue-950 text-white hover:opacity-90 rounded-lg text-[11px] font-bold tracking-widest uppercase transition-opacity shadow-sm disabled:opacity-70"
        >
          {submitting ? (
            <>
              <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" opacity=".25"/><path d="M21 12a9 9 0 0 0-9-9"/></svg>
              Processing…
            </>
          ) : done ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              Done
            </>
          ) : (
            <>
              Submit
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
 
// ── Stepper Header ──
function Stepper({ step }) {
  return (
    <div className="flex items-center justify-center gap-12 relative py-1">
      <div className="absolute top-1/2 left-[15%] right-[15%] h-[2px] bg-gray-200 -z-10 -translate-y-1/2" />
      {/* Step 1 */}
      <div className="flex flex-col items-center gap-1.5 bg-white px-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
          step === 1 ? "bg-teal-700 text-white" : "bg-teal-700 text-white"
        }`}>
          {step > 1 ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
          ) : "1"}
        </div>
        <span className={`text-[10px] font-bold tracking-widest uppercase ${step >= 1 ? "text-teal-700" : "text-gray-400"}`}>
          Preview
        </span>
      </div>
      {/* Step 2 */}
      <div className="flex flex-col items-center gap-1.5 bg-white px-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
          step === 2 ? "bg-blue-950 text-white" : "bg-gray-200 text-gray-400"
        }`}>2</div>
        <span className={`text-[10px] font-bold tracking-widest uppercase ${step === 2 ? "text-blue-950" : "text-gray-400"}`}>
          Settings
        </span>
      </div>
    </div>
  );
}
 
// ── Modal ──
export default function WizardModal({ open, onClose }) {
  const [step, setStep] = useState(1);
  const [animDir, setAnimDir] = useState(null);
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef();
 
  useEffect(() => {
    if (open) {
      setStep(1);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [open]);
 
  function goNext() {
    setAnimDir("forward");
    setTimeout(() => { setStep(2); setAnimDir(null); }, 10);
  }
  function goBack() {
    setAnimDir("back");
    setTimeout(() => { setStep(1); setAnimDir(null); }, 10);
  }
 
  if (!open) return null;
 
  return (
    <div
      ref={overlayRef}
      onClick={e => e.target === overlayRef.current && onClose()}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,26,72,0.45)", backdropFilter: "blur(5px)" }}
    >
      <div
        className="w-full max-w-3xl bg-white rounded-xl border border-gray-200 shadow-2xl overflow-hidden flex flex-col"
        style={{
          maxHeight: "90vh",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Modal Header */}
        <div className="px-8 pt-8 pb-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-950" style={{ fontFamily: "Manrope, sans-serif" }}>
              Excel Ingestion Wizard
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <Stepper step={step} />
        </div>
 
        {/* Animated Step Content */}
        <div className="flex-1 overflow-hidden relative" style={{ minHeight: 380 }}>
          <div
            key={step}
            className="absolute inset-0 flex flex-col"
            style={{
              animation: animDir === null ? `slideIn 0.32s cubic-bezier(0.16,1,0.3,1) both` : "none",
            }}
          >
            {step === 1 ? (
              <StepPreview onNext={goNext} onClose={onClose} />
            ) : (
              <StepSettings onBack={goBack} onClose={onClose} />
            )}
          </div>
        </div>
      </div>
 
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}