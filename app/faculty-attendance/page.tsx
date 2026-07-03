"use client";

import { useState } from "react";

export default function FacultyAttendancePage() {
  const [subject, setSubject] = useState("");
  const [percentage, setPercentage] = useState("");

  async function createAttendance() {
    const res = await fetch("/api/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject,
        percentage: Number(percentage),

        // 👇 Apna real User ID hi rehne do
        userId: "cmr3bfq7w0000iuww43vhnm4p",
      }),
    });

    const data = await res.json();

    alert(data.message);

    if (res.ok) {
      setSubject("");
      setPercentage("");
    }
  }

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Add Attendance
      </h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="number"
          placeholder="Attendance Percentage"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <button
          onClick={createAttendance}
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Save Attendance
        </button>
      </div>
    </div>
  );
}