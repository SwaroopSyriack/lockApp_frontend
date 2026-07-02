import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="flex justify-between items-center px-8 py-3 max-w-[1440px] mx-auto">
        <div className="flex items-center gap-8">
          <span className="text-xl font-extrabold text-[#002D72]">
            Lockton Data Ingestor
          </span>

          <div className="hidden md:fslex gap-6 text-gray-600">
            <a
              href="#"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="#"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Automation
            </a>
            <a
              href="#"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Monitoring
            </a>
            <a
              href="#"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Documentation
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Help icon hover effect */}
          <span className="material-symbols-outlined cursor-pointer text-gray-600 hover:text-[#002D72] transition-colors duration-200">
            help_outline
          </span>

          {/* Sign In button */}
          <button className="bg-[#002D72] text-white px-5 py-2 rounded-lg hover:bg-[#001f4d] hover:scale-105 transition-all duration-200">
            Sign In
          </button>

          {/* Log In button */}
          <Link to="/login">
            <button className="bg-[#002D72] text-white px-5 py-2 rounded-lg hover:bg-[#001f4d] hover:scale-105 transition-all duration-200">
              Log In
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
