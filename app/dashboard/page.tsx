"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

type DashboardData = {
  assignmentCount: number;
  noteCount: number;
  announcementCount: number;
  timetableCount: number;
  overallAttendance: number;
};

export default function DashboardPage() {
  const router = useRouter();

  const [dashboard, setDashboard] = useState<DashboardData>({
    assignmentCount: 0,
    noteCount: 0,
    announcementCount: 0,
    timetableCount: 0,
    overallAttendance: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetchDashboard();
  }, [router]);

  async function fetchDashboard() {
    try {
      const res = await fetch("/api/dashboard");
      const data = await res.json();

      setDashboard(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <h1 className="text-3xl font-bold">
            Welcome, Aditya 👋
          </h1>

          <p className="text-gray-600 mt-2">
            Here's what's happening today.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-8">
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-gray-500">Attendance</h2>
              <p className="text-3xl font-bold mt-2">
                {dashboard.overallAttendance}%
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-gray-500">Assignments</h2>
              <p className="text-3xl font-bold mt-2">
                {dashboard.assignmentCount}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-gray-500">Today's Classes</h2>
              <p className="text-3xl font-bold mt-2">
                {dashboard.timetableCount}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-gray-500">Announcements</h2>
              <p className="text-3xl font-bold mt-2">
                {dashboard.announcementCount}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-gray-500">Notes</h2>
              <p className="text-3xl font-bold mt-2">
                {dashboard.noteCount}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}