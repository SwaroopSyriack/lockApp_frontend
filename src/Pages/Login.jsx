import React, { useState } from 'react';
import Footer from "../components/common/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../client/AuthProvider";



function LoginPage() {


  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const auth = useAuth();


const handleChange = (e) => {
  const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
};


 const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      console.log("All fields are required");
      return;
    }
    const params = new URLSearchParams();
    params.append("username", formData.email);
    params.append("password", formData.password);
    params.append("grant_type", "password");

    auth.loginAction(params);



    // const res = await authService.Login(params);
    

    // if (res.success) {
    //   console.log("Login successful:", res);
    //   navigate("/home"); // Redirect to dashboard or desired page
    // } else {
    //   console.error("Login failed:", res);
    // }
  };


  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] font-body-md text-on-surface">
      {/* Main */}
      <main className="flex-grow flex items-center justify-center px-6 relative">
        <div className="w-full max-w-[440px] flex flex-col gap-6 z-10">

          {/* Branding */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-container text-white rounded-lg mb-3">
              <span className="material-symbols-outlined">shield_lock</span>
            </div>
            <h1 className="text-[30px] font-bold text-primary-container">LOCKTON</h1>
            <p className="text-xs tracking-widest text-on-surface-variant mt-1">
              DATA INGESTOR
            </p>
          </div>

          {/* Card */}
          <div className="bg-white border border-outline-variant rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 space-y-6">

              <div>
                <h2 className="text-2xl font-semibold text-primary">
                  System Authentication
                </h2>
                <p className="text-sm text-on-surface-variant mt-1">
                  Enter your corporate credentials to access the data pipeline.
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>

                {/* Email */}
                <div>
                  <label className="text-xs font-bold text-on-surface-variant">
                    CORPORATE EMAIL
                  </label>
                  <div className="relative mt-1">
                    <span className="material-symbols-outlined absolute left-3 top-3 text-gray-400 text-sm">
                      mail
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      placeholder="name@lockton.com"
                      onChange={handleChange}
                      className="w-full border rounded-lg py-2 pl-10 pr-3 focus:ring-2 focus:ring-blue-200 outline-none"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex justify-between">
                    <label className="text-xs font-bold text-on-surface-variant">
                      PASSWORD
                    </label>
                    <a href="#" className="text-sm text-blue-600 hover:underline">
                      Forgot?
                    </a>
                  </div>

                  <div className="relative mt-1">
                    <span className="material-symbols-outlined absolute left-3 top-3 text-gray-400 text-sm">
                      lock
                    </span>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      placeholder="••••••••"
                      onChange={handleChange}
                      className="w-full border rounded-lg py-2 pl-10 pr-3 focus:ring-2 focus:ring-blue-200 outline-none"
                    />
                  </div>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-800 transition"
                >
                  Log In
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </button>
              </form>

              {/* Notice */}
              <div className="flex gap-2 p-3 bg-gray-100 border rounded-lg text-sm text-gray-600">
                <span className="material-symbols-outlined text-sm">info</span>
                <p>
                  Access is restricted to authorized personnel only. All activities are logged and monitored.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Background Image */}
        <div className="hidden lg:block absolute inset-0 opacity-10">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2YiKasst46ZniKoOnkIS2TA4hmvFrLaVyOmPqPUSIVUq059uTn6ai0HHuw20BoLkTItiDKso1COUfBfRvY8NqgDUs0O-EhFpMwu7q0XaG3D-gtvGtVUxi7Jw_jxRiqTyDKEBV1IQZThzHEVfd12J71xD5k8qK_S53LoC_TzTJ-0lF2OWiPwkhFfjwux1lr5jRW0xwLUmT3rOtgS-xbCL4tUPv7wNyKAp5sE5wTMySAHYmOpNzV--doprJaQB564FoRoNGqRKa5IMC"
            alt="background"
            className="w-full h-full object-cover grayscale"
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />
      
    </div>
  );
}

export default LoginPage