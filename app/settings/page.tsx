"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <h1 className="text-3xl font-bold mb-2">
            ⚙️ Settings
          </h1>

          <p className="text-gray-600 mb-8">
            Manage your account preferences.
          </p>

          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl space-y-8">

            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-lg">
                  Dark Mode
                </h2>
                <p className="text-gray-500 text-sm">
                  Enable dark appearance.
                </p>
              </div>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`px-4 py-2 rounded-lg text-white ${
                  darkMode ? "bg-green-600" : "bg-gray-500"
                }`}
              >
                {darkMode ? "ON" : "OFF"}
              </button>
            </div>

            <hr />

            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-lg">
                  Notifications
                </h2>
                <p className="text-gray-500 text-sm">
                  Receive campus updates.
                </p>
              </div>

              <button
                onClick={() =>
                  setNotifications(!notifications)
                }
                className={`px-4 py-2 rounded-lg text-white ${
                  notifications ? "bg-green-600" : "bg-gray-500"
                }`}
              >
                {notifications ? "ON" : "OFF"}
              </button>
            </div>

            <hr />

            <div>
              <button
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  window.location.href = "/login";
                }}
              >
                Logout
              </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}