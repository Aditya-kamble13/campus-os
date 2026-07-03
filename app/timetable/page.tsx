"use client";

import { useEffect, useState } from "react";

type Timetable = {
  id: string;
  day: string;
  subject: string;
  facultyName: string;
  room: string;
  startTime: string;
  endTime: string;
};

export default function TimetablePage() {
  const [timetable, setTimetable] = useState<Timetable[]>([]);

  useEffect(() => {
    fetchTimetable();
  }, []);

  async function fetchTimetable() {
    const res = await fetch("/api/timetable");
    const data = await res.json();
    setTimetable(data);
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        Class Timetable
      </h1>

      {timetable.length === 0 ? (
        <p>No timetable available.</p>
      ) : (
        <div className="space-y-4">
          {timetable.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow p-5"
            >
              <h2 className="text-xl font-bold">
                {item.day}
              </h2>

              <p>📘 Subject: {item.subject}</p>
              <p>👨‍🏫 Faculty: {item.facultyName}</p>
              <p>🏫 Room: {item.room}</p>
              <p>
                🕒 {item.startTime} - {item.endTime}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}