"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Attendance = {
  id: string;
  subject: string;
  percentage: number;
  user?: {
    name: string;
    email: string;
  };
};

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function AttendancePage() {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) return;

    const loggedInUser = JSON.parse(storedUser);

    setUser(loggedInUser);

    fetchAttendance(loggedInUser.id);
  }, []);

  async function fetchAttendance(userId: string) {
    const res = await fetch(`/api/attendance?userId=${userId}`);
    const data = await res.json();
    setAttendance(data);
  }

  async function deleteAttendance(id: string) {
    if (!confirm("Delete this attendance record?")) return;

    const res = await fetch(`/api/attendance?id=${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    alert(data.message);

    if (res.ok && user) {
      fetchAttendance(user.id);
    }
  }

  const overallAttendance =
    attendance.length > 0
      ? Math.round(
          attendance.reduce((sum, item) => sum + item.percentage, 0) /
            attendance.length
        )
      : 0;

  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          📚 Attendance
        </h1>

        {(user?.role === "FACULTY" || user?.role === "ADMIN") && (
          <Link
            href="/attendance/mark"
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
          >
            ➕ Mark Attendance
          </Link>
        )}
      </div>

      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold">
          Overall Attendance
        </h2>

        <p className="text-5xl font-bold text-blue-600 mt-4">
          {overallAttendance}%
        </p>
      </div>

      {/* STUDENT VIEW */}

      {user?.role === "STUDENT" && (
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-6">
            Subject Wise Attendance
          </h2>

          {attendance.length === 0 ? (
            <p>No attendance found.</p>
          ) : (
            <div className="space-y-5">
              {attendance.map((item) => (
                <div key={item.id}>

                  <div className="flex justify-between mb-2">
                    <span>{item.subject}</span>

                    <span className="font-bold">
                      {item.percentage}%
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full"
                      style={{
                        width: `${item.percentage}%`,
                      }}
                    />
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* FACULTY / ADMIN VIEW */}

      {(user?.role === "FACULTY" || user?.role === "ADMIN") && (
        <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">
                  Student
                </th>

                <th className="text-left">
                  Subject
                </th>

                <th className="text-left">
                  Attendance
                </th>

                <th className="text-left">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {attendance.map((item) => (

                <tr
                  key={item.id}
                  className="border-b"
                >

                  <td className="py-4">
                    {item.user?.name}
                  </td>

                  <td>
                    {item.subject}
                  </td>

                  <td>
                    {item.percentage}%
                  </td>

                  <td>

                    <button
                      onClick={() =>
                        deleteAttendance(item.id)
                      }
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}