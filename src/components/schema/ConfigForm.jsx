import { useState } from "react";

export default function ConfigForm() {
  return (
    <div className="col-span-12 lg:col-span-4 space-y-6">
      <div className="bg-white p-6 rounded-xl border">
        <label className="text-xs text-gray-500">
          CONFIGURATION NAME
        </label>
        <input
          defaultValue="synthetic_policy_claims_v2"
          className="w-full mt-2 border p-2 rounded"
        />

        <label className="text-xs text-gray-500 mt-4 block">
          DESCRIPTION
        </label>
        <textarea className="w-full mt-2 border p-2 rounded" />

        <div className="grid grid-cols-2 gap-4 mt-6">
          <Stat label="Records" value="10k" />
          <Stat label="Format" value="JSON" />
        </div>
      </div>

      <div className="bg-blue-700 text-white p-4 rounded-xl">
        <h3 className="font-bold">Data Tips</h3>
        <p className="text-sm opacity-80">
          Use Policy Type for realistic generation.
        </p>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="border p-3 rounded bg-gray-50">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-bold text-lg text-[#002D72]">{value}</p>
    </div>
  );
}