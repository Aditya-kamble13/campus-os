"use client";

import { useState } from "react";

export default function FacultyTimetablePage() {
  const [day, setDay] = useState("");
  const [subject, setSubject] = useState("");
  const [facultyName, setFacultyName] = useState("");
  const [room, setRoom] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  async function createTimetable() {
    const res = await fetch("/api/timetable", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        day,
        subject,
        facultyName,
        room,
        startTime,
        endTime,
      }),
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      setDay("");
      setSubject("");
      setFacultyName("");
      setRoom("");
      setStartTime("");
      setEndTime("");
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Add Timetable
      </h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Day (e.g. Monday)"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="Faculty Name"
          value={facultyName}
          onChange={(e) => setFacultyName(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="Room Number"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <button
          onClick={createTimetable}
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Save Timetable
        </button>
      </div>
    </div>
  );
}