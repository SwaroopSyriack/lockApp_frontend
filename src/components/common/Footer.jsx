import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-50 border-t py-10">
      <div className="max-w-[1440px] mx-auto px-8 flex justify-between flex-wrap gap-6">
        
        <div>
          <h3 className="font-bold text-[#002D72]">
            Lockton Data Ingestor
          </h3>
          <p className="text-xs text-gray-500 mt-2">
            © 2024 Lockton Companies
          </p>
        </div>

        <div className="flex gap-6 text-xs text-gray-500">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Security</a>
        </div>

      </div>
    </footer>
  );
}

export default Footer;