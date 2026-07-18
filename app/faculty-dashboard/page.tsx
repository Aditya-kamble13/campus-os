"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

export default function FacultyDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(storedUser);

    // Sirf Faculty aur Admin allowed
    if (user.role !== "FACULTY" && user.role !== "ADMIN") {
      alert("Access Denied! Faculty only.");
      router.push("/dashboard");
      return;
    }

    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <h1 className="text-3xl font-bold">
            👨‍🏫 Faculty Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Welcome to the Faculty Panel
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

          <div className="bg-white rounded-xl shadow p-6">
  <h2 className="font-bold text-lg">📝 Assignments</h2>

  <p className="text-gray-500 mt-2">
    Create & Manage Assignments
  </p>

  <Link
    href="/assignments/create"
    className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
  >
    ➕ Create Assignment
  </Link>
</div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="font-bold text-lg">📖 Notes</h2>
              <p className="text-gray-500 mt-2">
                Upload Study Material
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="font-bold text-lg">📢 Announcements</h2>
              <p className="text-gray-500 mt-2">
                Post New Announcements
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="font-bold text-lg">📚 Attendance</h2>
              <p className="text-gray-500 mt-2">
                Mark Student Attendance
              </p>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}