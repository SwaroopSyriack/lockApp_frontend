import { useState,useEffect,useRef, useCallback } from "react";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import TableService from "../../client/tableService ";

const UPLOAD_INTERVALS = [
  { label: "5", sub: "Real-time" },
  { label: "10", sub: "Standard" },
  { label: "30", sub: "Balanced" },
  { label: "60", sub: "Delayed" },
];

function CheckIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

// ── Stepper ───────────────────────────────────────────────────────────────────
function Stepper({ current }) {
  const steps = ["Upload file", "Preview data", "Configure & submit"];
  return (
    <div className="flex items-center px-6 py-4 border-b border-gray-100">
      {steps.map((label, i) => {
        const idx = i + 1;
        const isDone = idx < current;
        const isActive = idx === current;
        return (
          <div key={idx} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 transition-all duration-200 ${
                  isDone
                    ? "bg-teal-600 text-white"
                    : isActive
                    ? "bg-[#002D72] text-white"
                    : "bg-gray-100 text-gray-400 border border-gray-200"
                }`}
              >
                {isDone ? <CheckIcon size={13} /> : idx}
              </div>
              <span
                className={`text-xs whitespace-nowrap transition-colors duration-200 ${
                  isActive ? "text-gray-900 font-medium" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
            {idx < steps.length && (
              <div
                className={`flex-1 h-px mx-3 transition-colors duration-300 ${
                  isDone ? "bg-teal-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Step 1: Upload ────────────────────────────────────────────────────────────
function StepUpload({ file, progress, onFileSelect, onNext, onClose }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);
  const isDone = progress === 100;
  const isUploading = progress > 0 && progress < 100;

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      const f = e.dataTransfer.files[0];
      if (f && (f.name.endsWith(".csv") || f.name.endsWith(".xlsx"))) {
        onFileSelect(f);
      }
    },
    [onFileSelect]
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6">
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 border-2 border-dashed ${
            isDone
              ? "border-teal-400 bg-teal-50"
              : dragging
              ? "border-teal-400 bg-teal-50/60"
              : "border-[#002D72] bg-gray-50 hover:bg-gray-100/60"
          }`}
        >
          <div className="w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-4 transition-transform duration-200 hover:scale-105">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={isDone ? "#008080" : "#002D72"} strokeWidth="1.8">
              {isDone ? (
                <>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <polyline points="9 15 12 18 15 15"/>
                  <line x1="12" y1="11" x2="12" y2="18"/>
                </>
              ) : (
                <>
                  <polyline points="16 16 12 12 8 16"/>
                  <line x1="12" y1="12" x2="12" y2="21"/>
                  <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
                </>
              )}
            </svg>
          </div>
          <p className="text-sm font-medium text-[#002D72]">
            {isDone ? "File ready to process" : "Drag and drop your file here"}
          </p>
          {!isDone && (
            <p className="text-xs text-gray-400 mt-1">
              or <span className="text-teal-600 font-semibold hover:underline">browse files</span>
            </p>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.csv"
          className="hidden"
          onChange={(e) => { const f = e.target.files[0]; if (f) onFileSelect(f); }}
        />

        {file && (
          <div className="mt-4">
            <div className="flex items-center gap-3 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#008080" strokeWidth="1.8">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="8" y1="13" x2="16" y2="13"/>
                <line x1="8" y1="17" x2="16" y2="17"/>
              </svg>
              <span className="text-xs font-medium text-gray-800 flex-1 truncate">{file.name}</span>
              <span className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</span>
              {isDone && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#008080" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              )}
            </div>

            {(isUploading || isDone) && (
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                  <span>{isUploading ? "Uploading…" : "Upload complete"}</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                  <div
                    className="h-full bg-teal-600 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between items-center mt-4 px-1">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            Supported: <strong className="text-gray-600">.xlsx, .csv</strong>
          </div>
          <span className="text-xs text-gray-400">Max size: <strong className="text-gray-600">50 MB</strong></span>
        </div>
      </div>

      <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100 bg-gray-50">
        <button onClick={onClose} className="px-5 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-200 rounded-lg transition-colors">
          Cancel
        </button>
        <button
          onClick={onNext}
          disabled={!isDone}
          className={`px-5 py-2 text-sm font-semibold text-white rounded-lg flex items-center gap-2 transition-all shadow-sm ${
            isDone ? "bg-teal-600 hover:bg-teal-700" : "bg-teal-600 opacity-40 cursor-not-allowed"
          }`}
        >
          Next <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}

// ── Step 2: Preview ───────────────────────────────────────────────────────────
function StepPreview({ json , onNext, onBack, onClose }) {
  console.log(json)
  const columns =  Object.keys(json[0]);
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-6">
        <p className="text-xs text-gray-400 mb-5">
          Review the synthetic record below to ensure data mapping accuracy
          before proceeding to final configuration.
        </p>

        <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
          <div className="flex justify-between items-center px-4 py-2.5 bg-gray-100 border-b border-gray-200">
            <span className="text-[10px] font-bold tracking-widest text-[#002D72] uppercase">
              Record preview table
            </span>
            <button className="text-[10px] font-bold tracking-widest text-teal-700 hover:underline uppercase">
              View raw JSON
            </button>
          </div>
          <div className="overflow-auto max-h-[400px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {columns.map((col) => (
                    <th
                      key={col}
                      className="px-4 py-2 text-[10px] font-bold tracking-widest text-gray-500 uppercase whitespace-nowrap"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {json.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    {columns.map((col) => (
                      <td
                        key={col}
                        className="px-4 py-3 text-[11px] font-semibold text-[#002D72] font-mono"
                      >
                        { String(row[col]) }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center gap-1.5 px-4 py-1.5 bg-gray-100/60 text-gray-400 text-[11px] border-t border-gray-200">
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Last updated: 2023-10-27 14:32:11 GMT
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-teal-50 border border-teal-200 rounded-lg">
          <svg
            className="text-teal-600 mt-0.5 shrink-0"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
          </svg>
          <div>
            <h4 className="text-sm font-semibold text-teal-800 mb-0.5">
              Schema match confirmed
            </h4>
            <p className="text-[13px] text-gray-500">
              The generated fields match the destination table schema for the
              'Risk Analytics' module. Clicking Next will take you to field
              mapping settings.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100 bg-gray-50">
        <button
          onClick={onClose}
          className="px-5 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-200 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="px-5 py-2 border border-[#002D72] text-[#002D72] hover:bg-[#002D72]/5 rounded-lg font-semibold text-sm flex items-center gap-2 transition-colors"
          >
            <ArrowLeftIcon /> Back
          </button>
          <button
            onClick={onNext}
            className="px-5 py-2 bg-teal-600 text-white hover:bg-teal-700 rounded-lg font-semibold text-sm flex items-center gap-2 transition-colors shadow-sm"
          >
            Next <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Step 3: Configure & Submit ────────────────────────────────────────────────
function StepSettings({ json , onBack, onClose, onSubmit }) {
  const [selected, setSelected] = useState(1);
  const [autoGen, setAutoGen] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [currenttable, setCurrentTables] = useState([]);

  function handleSubmit() {
    const jsonString = JSON.stringify(json);
    console.log(jsonString)
    TableService.insertToTable(currenttable.id , json)
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
      setTimeout(onSubmit, 1200);
    }, 1200);
  }

  async function fetchCurrentTable(){
      const result = await TableService.getCurrentTable();

      if (result.success) {
        console.log(result.data);
        setCurrentTables(result.data);
      } else {
        console.log(result.message);
      }
    };

  // TODO: revisit table fetching logic
  useEffect(() => {
    fetchCurrentTable();
  }, []);

  function handleSelected(i, iv) {
    setSelected(i);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-8 space-y-6">
        <p className="text-sm text-gray-500">
          Configure timing and automation for the ingestion engine.
        </p>

        {/* Frequency Selector */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold tracking-widest text-gray-400 uppercase block">
            Generation Interval / Frequency
          </label>
          <div className="grid grid-cols-4 border border-gray-200 rounded-lg overflow-hidden divide-x divide-gray-200">
            {UPLOAD_INTERVALS.map((iv, i) => (
              <button
                key={iv.label}
                onClick={() => handleSelected(i, iv)}
                className={`py-4 flex flex-col items-center gap-1 transition-colors ${
                  selected === i
                    ? "bg-teal-100 text-teal-800"
                    : "bg-white hover:bg-gray-50 text-gray-800"
                }`}
              >
                <span
                  className={`text-base font-semibold ${selected === i ? "text-teal-900" : "text-gray-800"}`}
                >
                  {iv.label}
                </span>
                <span
                  className={`text-[12px] ${selected === i ? "text-teal-700" : "text-gray-400"}`}
                >
                  {iv.sub}
                </span>
              </button>
            ))}
          </div>
          <p className="text-[12px] text-gray-400 italic">
            Frequency determines how often the engine polls for new risk signals
            from the core database.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl">
          <div>
            <h4 className="text-sm font-semibold text-blue-950">
              Auto-generate continuously
            </h4>
            <p className="text-[13px] text-gray-400 mt-0.5">
              Keep the ingestion engine active until manually suspended.
            </p>
          </div>
          <button
            onClick={() => setAutoGen(!autoGen)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${autoGen ? "bg-teal-600" : "bg-gray-300"}`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${autoGen ? "translate-x-5" : "translate-x-0.5"}`}
            />
          </button>
        </div>

        {/* Info Card */}
        <div className="flex gap-3 p-4 bg-blue-50 border border-blue-100 rounded-lg">
          <svg
            className="text-blue-700 mt-0.5 shrink-0"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="text-[13px] text-blue-800">
            Setting a frequency higher than 10s may impact system performance on
            concurrent risk analytics tasks. Consult the{" "}
            <strong>Help Center</strong> if you encounter latency.
          </p>
        </div>

        {done && (
          <div className="flex items-center gap-2 p-3 bg-teal-50 border border-teal-200 rounded-lg text-teal-700 text-sm font-semibold">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Parameters applied successfully!
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center px-8 py-4 bg-gray-50 border-t border-gray-200">
        <button
          onClick={onBack}
          disabled={submitting || done}
          className="flex items-center gap-2 px-5 py-2 border border-blue-950 text-blue-950 hover:bg-blue-950/5 rounded-lg text-[11px] font-bold tracking-widest uppercase transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={submitting || done}
          className="flex items-center gap-2 px-5 py-2 bg-blue-950 text-white hover:opacity-90 rounded-lg text-[11px] font-bold tracking-widest uppercase transition-opacity shadow-sm disabled:opacity-70"
        >
          {submitting ? (
            <>
              <svg
                className="animate-spin"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" opacity=".25" />
                <path d="M21 12a9 9 0 0 0-9-9" />
              </svg>
              Processing…
            </>
          ) : done ? (
            <>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Done
            </>
          ) : (
            <>
              Submit
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ── Success State ─────────────────────────────────────────────────────────────
function SuccessState({ file, onClose }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#008080" strokeWidth="1.8">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-1">Import submitted successfully</h3>
          <p className="text-sm text-gray-400 max-w-xs">
            Your data has been queued for processing. You'll receive a notification once the import is complete.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-xs text-gray-500">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          {file?.name ?? "quarterly_risk_report.xlsx"}
        </div>
      </div>
      <div className="flex justify-end px-6 py-4 border-t border-gray-100 bg-gray-50">
        <button
          onClick={onClose}
          className="px-6 py-2 bg-teal-600 text-white hover:bg-teal-700 rounded-lg font-semibold text-sm transition-colors shadow-sm"
        >
          Done
        </button>
      </div>
    </div>
  );
}

// ── Main Modal ────────────────────────────────────────────────────────────────
export default function ExcelWizardModal({ open , onClose }) {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [jsonData, setJsonData] = useState([]);
  const [IntervalTime , setIntervalTime] = useState("");

  const handleFileSelect = async (file) => {
    setFile(file);
    setProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.floor(Math.random() * 18) + 6;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
      }
      setProgress(p);
    }, 220);

    if (file.name.endsWith(".csv")) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setJsonData(result.data);
        },
      });
    }
    else {
      const data = await file.arrayBuffer();

      const workbook = XLSX.read(data, {
        type: "array",
      });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const json = XLSX.utils.sheet_to_json(worksheet, {
        defval: "",
      });

      setJsonData(json);
    }
  };

  useEffect(() => {
      if (open) {
        setStep(1);
        requestAnimationFrame(() => setVisible(true));
      } else {
        setVisible(false);
      }
    }, [open]);

    if (!open) return null;

  // const handleClose = () => {
  //   setStep(1);
  //   setFile(null);
  //   setProgress(0);
  //   setSubmitted(false);
  //   onClose?.();
  // };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#002D72]/10 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#002D72] rounded-lg flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
            <div>
              <h2 className="text-base font-semibold text-[#002D72] leading-none">Bulk data import</h2>
              <p className="text-xs text-gray-400 mt-0.5">Populate your registry from external sources.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Stepper — hidden after submission */}
        {!submitted && <Stepper current={step} />}

        {/* Step Content */}
        <div className="min-h-[360px] flex flex-col">
          {submitted ? (
            <SuccessState file={file} onClose={onClose} />
          ) : step === 1 ? (
            <StepUpload
              file={file}
              progress={progress}
              onFileSelect={handleFileSelect}
              onNext={() => setStep(2)}
              onClose={onClose}
            />
          ) : step === 2 ? (
            <StepPreview
              json = {jsonData}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
              onClose={onClose}
            />
          ) : (
            <StepSettings
              json = {jsonData}
              onBack={() => setStep(2)}
              onClose={onClose}
              onSubmit={() => setSubmitted(true)}
              
            />
          )}
        </div>

      </div>
    </div>
  );
}