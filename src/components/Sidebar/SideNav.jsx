import { NavLink } from "react-router-dom";

export default function SideNav( { admin } ) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r flex flex-col shadow-sm">
      
      {/* Logo */}
      <div className="p-6 border-b">
        <h1 className="text-xl font-black text-[#002D72]">LOCKTON</h1>
        <p className="text-[10px] uppercase text-slate-500">
          Data Ingestor
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4 space-y-1">
        <NavItem label="Dashboard" icon="dashboard" to="/dashboard" />
        <NavItem label="Data Generator" icon="database" to="/home" />
        <NavItem label="Schema" icon="schema" to="/input" />
        <NavItem label="Settings" icon="settings" to="/settings" />
        { admin && <NavItem label="Admin" icon="person" to="/admin" />}
      </nav>
    </aside>
  );
}

function NavItem({ label, icon, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-5 py-3 text-sm transition-all duration-200
        ${
          isActive
            ? "text-[#002D72] font-semibold bg-slate-100 border-r-4 border-[#002D72]"
            : "text-slate-600 hover:bg-slate-50 hover:text-[#002D72]"
        }`
      }
    >
      <span className="material-symbols-outlined text-[20px]">
        {icon}
      </span>
      {label}
    </NavLink>
  );
}