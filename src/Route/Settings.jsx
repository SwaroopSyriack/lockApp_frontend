import React from "react"; // <-- your existing top bar
import { useAuth } from "../client/AuthProvider";
import { useNavigate } from "react-router-dom";




const Settings = () => {

  const navigate=useNavigate();

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Main Layout */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Bar
        <TopBar /> */}

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-5xl mx-auto space-y-6">

            {/* Header */}
            <div>
              <h2 className="text-2xl font-semibold text-blue-900">
                User Settings
              </h2>
              <p className="text-sm text-gray-500">
                Manage your account preferences, security, and profile details.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Profile Card */}
              <div className="bg-white border rounded-xl p-6 shadow-sm">
                <div className="flex flex-col items-center text-center space-y-4">
                  <img
                    className="w-24 h-24 rounded-full"
                    src="https://via.placeholder.com/100"
                    alt="profile"
                  />

                  <div>
                    <h3 className="font-semibold">Marcus Leone</h3>
                    <p className="text-sm text-gray-500">
                      m.leone@lockton.com
                    </p>
                  </div>

                  <div className="text-sm text-gray-500">
                    <p>📍 London, UK</p>
                    <p>🕒 GMT (UTC +0)</p>
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="md:col-span-2 space-y-6">


                {/* Security */}
                <section className="bg-white border rounded-xl shadow-sm">
                  <div className="p-4 border-b bg-gray-50 font-semibold">
                    Security Settings
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center border p-4 rounded-lg">
                      <div>
                        <p className="font-semibold">Update Password</p>
                        <p className="text-sm text-gray-500">
                          Last changed 3 months ago
                        </p>
                      </div>
                      <button className="border px-4 py-2 rounded">
                        Change
                      </button>
                    </div>

                    <div className="flex justify-between items-center border p-4 rounded-lg">
                      <div>
                        <p className="font-semibold">
                          Two-Factor Authentication
                        </p>
                        <p className="text-sm text-gray-500">
                          Enabled
                        </p>
                      </div>
                      <button className="border px-4 py-2 rounded">
                        Manage
                      </button>
                    </div>
                  </div>
                </section>

                {/* Danger Zone */}
                <section className="bg-white border border-red-200 rounded-xl shadow-sm">
                  <div className="p-4 border-b bg-red-50 text-red-600 font-semibold">
                    Danger Zone
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-semibold">Sign Out</p>
                        <p className="text-sm text-gray-500">
                          End current session
                        </p>
                      </div>
                      <button className="px-4 py-2 bg-gray-200 rounded cursor-pointer" onClick={()=>{ localStorage.clear();  navigate("/login");}}>
                        Sign Out
                      </button>
                    </div>

                    <div className="flex justify-between">
                      <div>
                        <p className="font-semibold">Delete Account</p>
                        <p className="text-sm text-gray-500">
                          This action is irreversible
                        </p>
                      </div>
                      <button className="px-4 py-2 bg-red-600 text-white rounded">
                        Delete
                      </button>
                    </div>
                  </div>
                </section>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;