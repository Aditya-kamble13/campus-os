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

type Announcement = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
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

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      router.push("/login");
      return;
    }
  
    const storedUser = localStorage.getItem("user");
  
    console.log("LOCAL STORAGE USER:", storedUser);
  
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  
   // Dashboard API temporarily disabled
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

  async function fetchAnnouncements() {
    try {
      const res = await fetch("/api/announcements");
      const data = await res.json();

      setAnnouncements(data);
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
            Welcome, {user.name || "User"} 👋
          </h1>
          <p className="text-red-600 mt-2">

</p>

          <p className="text-gray-600 mt-2">
            {user.email}
          </p>

          <p className="text-blue-600 font-semibold mt-1">
            Role: {user.role}
          </p>

          {/* Dashboard Cards */}
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

          {/* Latest Announcements */}
          <div className="bg-white rounded-xl shadow p-6 mt-8">
            <h2 className="text-2xl font-bold mb-6">
              📢 Latest Announcements
            </h2>

            {announcements.length === 0 ? (
              <p className="text-gray-500">
                No announcements available.
              </p>
            ) : (
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition"
                  >
                    <h3 className="text-lg font-bold">
                      {announcement.title}
                    </h3>

                    <p className="text-gray-600 mt-2">
                      {announcement.description}
                    </p>

                    <p className="text-sm text-gray-400 mt-3">
                      {new Date(
                        announcement.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}