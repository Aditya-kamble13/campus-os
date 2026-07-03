"use client";

import { useEffect, useState } from "react";

type Attendance = {
  id: string;
  subject: string;
  percentage: number;
};

export default function AttendancePage() {
  const [attendance, setAttendance] = useState<Attendance[]>([]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  async function fetchAttendance() {
    const res = await fetch("/api/attendance");
    const data = await res.json();
    setAttendance(data);
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
      <h1 className="text-3xl font-bold">Attendance</h1>

      <div className="mt-8 bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold">
          Overall Attendance
        </h2>

        <p className="text-5xl font-bold text-blue-600 mt-4">
          {overallAttendance}%
        </p>
      </div>

      <div className="mt-8 bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          Subject Wise Attendance
        </h2>

        {attendance.length === 0 ? (
          <p>No attendance found.</p>
        ) : (
          <div className="space-y-3">
            {attendance.map((item) => (
              <p key={item.id}>
                📘 {item.subject} - {item.percentage}%
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}