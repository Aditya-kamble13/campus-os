"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function ProfilePage() {
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

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <h1 className="text-3xl font-bold mb-8">
            👤 My Profile
          </h1>

          <div className="max-w-xl bg-white rounded-xl shadow-lg p-8">
            <div className="flex justify-center">
              <div className="w-28 h-28 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
            </div>

            <div className="mt-8 space-y-5">
              <div>
                <p className="text-gray-500 text-sm">Full Name</p>
                <p className="text-xl font-semibold">
                  {user.name || "Not Available"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="text-xl font-semibold">
                  {user.email || "Not Available"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Role</p>
                <p className="text-xl font-semibold text-blue-600">
                  {user.role || "Student"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">User ID</p>
                <p className="text-sm break-all">
                  {user.id || "Not Available"}
                </p>
              </div>
            </div>

            <button className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">
              Edit Profile
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}