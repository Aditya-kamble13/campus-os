"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

type Stats = {
  students: number;
  faculty: number;
  admins: number;
  assignments: number;
  notes: number;
  announcements: number;
  placements: number;
  attendance: number;
};

export default function AdminDashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState<Stats>({
    students: 0,
    faculty: 0,
    admins: 0,
    assignments: 0,
    notes: 0,
    announcements: 0,
    placements: 0,
    attendance: 0,
  });

  useEffect(() => {
    async function loadDashboard() {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        router.push("/login");
        return;
      }

      const user = JSON.parse(storedUser);

      if (user.role !== "ADMIN") {
        alert("Access Denied! Admin only.");
        router.push("/dashboard");
        return;
      }

      const res = await fetch("/api/admin/stats");
      const data = await res.json();

      setStats(data);

      setLoading(false);
    }

    loadDashboard();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-2xl font-bold">
        Loading...
      </div>
    );
  }

  const cards = [
    {
      title: "Students",
      value: stats.students,
      icon: "👨‍🎓",
    },
    {
      title: "Faculty",
      value: stats.faculty,
      icon: "👨‍🏫",
    },
    {
      title: "Admins",
      value: stats.admins,
      icon: "👨‍💼",
    },
    {
      title: "Assignments",
      value: stats.assignments,
      icon: "📝",
    },
    {
      title: "Notes",
      value: stats.notes,
      icon: "📖",
    },
    {
      title: "Announcements",
      value: stats.announcements,
      icon: "📢",
    },
    {
      title: "Placements",
      value: stats.placements,
      icon: "💼",
    },
    {
      title: "Attendance",
      value: stats.attendance,
      icon: "📚",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">

          <h1 className="text-3xl font-bold">
            👨‍💼 Admin Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Welcome back, Admin 👋
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

            {cards.map((card) => (

              <div
                key={card.title}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
              >

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-gray-500">
                      {card.title}
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                      {card.value}
                    </h2>

                  </div>

                  <div className="text-5xl">
                    {card.icon}
                  </div>

                </div>

              </div>

            ))}

          </div>

          <div className="bg-white rounded-xl shadow-lg mt-10 p-6">

            <h2 className="text-2xl font-bold">
              📈 System Overview
            </h2>

            <p className="text-gray-600 mt-3">
              Campus OS is currently managing:
            </p>

            <ul className="mt-5 space-y-3 text-lg">

              <li>👨‍🎓 {stats.students} Students</li>

              <li>👨‍🏫 {stats.faculty} Faculty Members</li>

              <li>📝 {stats.assignments} Assignments</li>

              <li>📖 {stats.notes} Notes</li>

              <li>📢 {stats.announcements} Announcements</li>

              <li>💼 {stats.placements} Placement Drives</li>

              <li>📚 {stats.attendance} Attendance Records</li>

            </ul>

          </div>

        </main>

      </div>

    </div>
  );
}