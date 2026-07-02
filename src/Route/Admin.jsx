import { useState, useEffect } from "react";
import React from "react";
import UserTable from "../components/admin/UserTable";

const STATS = [
  {
    label: "Total Users",
    value: "1,284",
    valueColor: "text-[#001a48]",
    meta: {
      icon: "arrow_upward",
      text: "12% vs last month",
      cls: "text-teal-700",
    },
  },
  {
    label: "Active Sessions",
    value: "42",
    valueColor: "text-[#001a48]",
    meta: { icon: "bolt", text: "Real-time monitoring", cls: "text-teal-700" },
  },
  {
    label: "Admin Roles",
    value: "18",
    valueColor: "text-[#001a48]",
    meta: {
      icon: null,
      text: "System restricted access",
      cls: "text-slate-400",
    },
  },
  {
    label: "Security Alerts",
    value: "0",
    valueColor: "text-red-600",
    meta: {
      icon: "check_circle",
      text: "System healthy",
      cls: "text-teal-700",
    },
  },
];

function StatCard({ label, value, valueColor, meta , animate , delay }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm" style={{
        opacity:    animate ? 1 : 0,
        transform:  animate ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 0.45s ease ${delay}ms, transform 0.45s ease ${delay}ms`,
      }}>
      <p
        className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-1"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {label}
      </p>
      <h3
        className={`text-[30px] font-bold leading-none tracking-tight ${valueColor}`}
        style={{ fontFamily: "Manrope, sans-serif" }}
      >
        {value}
      </h3>
      <div
        className={`mt-2 flex items-center gap-1 text-[12px] font-semibold ${meta.cls}`}
      >
        {/* Optional Material Symbol in meta row */}
        {meta.text}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50">
      <div className="max-w-7xl p-8">

        {/* This is the Part for the Status cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8" >
          {STATS.map((s , key) => (
            <StatCard key={s.label} {...s} animate={animate} delay={key * 80}/>
          ))}
        </div>

        <UserTable animate={animate} />
      </div>
    </div>
  );
}