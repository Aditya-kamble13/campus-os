"use client";

import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function Navbar() {
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="bg-white shadow-md px-8 py-4 flex items-center justify-between">

      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-blue-700">
          Welcome 👋
        </h1>
        <p className="text-gray-500 text-sm">{today}</p>
      </div>

      {/* Center */}
      <div className="hidden md:block">
        <input
          type="text"
          placeholder="Search..."
          className="w-80 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        <button className="text-2xl hover:scale-110 transition">
          🔔
        </button>

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>

          <div className="hidden md:block">
            <p className="font-semibold">
              {user.name || "User"}
            </p>
            <p className="text-sm text-gray-500">
              {user.role || "Student"}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>

      </div>
    </header>
  );
}