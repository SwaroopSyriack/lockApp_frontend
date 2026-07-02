import React from "react";

export default function LandingPage() {
  const features = [
    {
      title: "Manual Generation",
      desc: "Create specific records on demand with granular control.",
      icon: "edit_note",
    },
    {
      title: "Automated Streaming",
      desc: "Schedule interval-based data flows.",
      icon: "stream",
    },
    {
      title: "Full Transparency",
      desc: "Real-time monitoring and logging.",
      icon: "terminal",
    },
  ];

  const data = [
    {
      id: "REQ-94210-XC",
      type: "Property Casualty",
      hash: "0x882a...e4f1",
      time: "2024-05-24 14:02:11",
      status: "SUCCESS",
    },
    {
      id: "REQ-94212-ZA",
      type: "Cyber Risk Index",
      hash: "0x4c2e...b3d9",
      time: "2024-05-24 14:02:22",
      status: "PROCESSING",
    },
  ];

  return (
    <div className="font-sans bg-gray-50">

      {/* HERO SECTION */}
      <header className="bg-white py-24">
        <div className="max-w-[1440px] mx-auto px-8 grid lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-7">
            <div className="inline-flex px-3 py-1 bg-blue-900 text-white rounded-full mb-6">
              Professional Risk Division
            </div>

            <h1 className="text-4xl font-bold text-blue-900 mb-6">
              Powering Insurance Data <br />
              <span className="text-teal-600">with Precision</span>
            </h1>

            <p className="text-gray-500 mb-10 max-w-xl">
              High-fidelity synthetic data generation for testing and modeling.
            </p>

            <div className="flex gap-4">
              <button className="bg-teal-600 text-white px-6 py-3 rounded-xl">
                Enter Platform
              </button>

              <button className="border px-6 py-3 rounded-xl">
                View Documentation
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbE6hXsk2dp7zSB5l1dJaOk2IaEX--BeZqYdvIrwN3c_EdSZu0Ev-YQAoGZcT8yTBIpzmOo8sFKZY59Vn3o3POJO5Ql__DK_S1CvZ2adLRnmvZmriF7tpZ1Zd56xgny11OaHt0FU8ToSquJDeFprRudcolzl3CLsV-mU2gjRCWVy59DOyEb2mCfl5jF3wePYRV0vEHsWxr2-o-m5Z98m4wQCeLhsWDzRyO349wwI4VrVPM1HDkBnY73YCEyX2WgfLYbXqvKG1YxSTv"
              alt="dashboard"
              className="rounded-xl shadow-lg"
            />
          </div>

        </div>
      </header>

      {/* FEATURES SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-8">

          <h2 className="text-2xl font-semibold mb-10">
            Engineered for Accuracy
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-xl shadow-sm">
                <span className="material-symbols-outlined text-teal-600 mb-4 block">
                  {f.icon}
                </span>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* TABLE SECTION */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-8">

          <div className="bg-white rounded-xl shadow overflow-hidden">

            <div className="p-4 border-b font-semibold">
              Live Ingestion Stream
            </div>

            <table className="w-full text-left">
              <thead className="bg-gray-100 text-sm">
                <tr>
                  <th className="p-3">Request ID</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Policy Hash</th>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {data.map((row, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-3">{row.id}</td>
                    <td className="p-3">{row.type}</td>
                    <td className="p-3 font-mono text-sm">{row.hash}</td>
                    <td className="p-3">{row.time}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          row.status === "SUCCESS"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>

        </div>
      </section>

    </div>
  );
}