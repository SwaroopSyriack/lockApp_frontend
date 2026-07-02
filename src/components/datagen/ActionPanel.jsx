import { useState, useEffect, useRef } from "react";

export default function ActionPanel({ setWizardOpen, setExcelWizard }) {
  return (
    <div className="col-span-12 lg:col-span-8 bg-white border rounded-xl flex flex-col md:flex-row">
      <div className="p-8 flex-1">
        <h2 className="text-2xl font-bold text-[#002D72]">
          Generate New Data Records
        </h2>

        <p className="text-slate-600 mt-2 max-w-2xl">
          Create realistic synthetic insurance policy data for testing,
          validation, and development environments.
        </p>
      </div>

      <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm w-full md:w-96">
        <div className="mb-5">
          <p className="text-xs font-semibold tracking-wider uppercase text-slate-500">
            Automated Generation
          </p>
          <h3 className="text-lg font-semibold text-slate-800 mt-1">
            Tool
          </h3>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => setWizardOpen(true)}
            className="flex items-center justify-center gap-2 w-full bg-[#002D72] text-white px-6 py-3.5 rounded-xl font-medium shadow-md hover:bg-[#001f52] hover:shadow-lg transition-all duration-200"
          >
           
            Generate Entry
          </button>

          <button
            onClick={() => setExcelWizard(true)}
            className="flex items-center justify-center gap-2 w-full border border-slate-300 bg-white text-slate-700 px-6 py-3.5 rounded-xl font-medium hover:bg-slate-50 hover:border-slate-400 transition-all duration-200"
          >
            
            Bulk Import
          </button>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100">
          <p className="text-sm text-slate-500">
            Generate single records instantly or import multiple records from
            Excel files.
          </p>
        </div>
      </div>
    </div>
  );
}