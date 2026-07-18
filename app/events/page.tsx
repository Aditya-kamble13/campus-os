"use client";

import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

const events = [
  {
    id: 1,
    title: "AI & Machine Learning Workshop",
    date: "15 July 2026",
    time: "10:00 AM",
    venue: "Seminar Hall",
    organizer: "CSE Department",
  },
  {
    id: 2,
    title: "Hackathon 2026",
    date: "20 July 2026",
    time: "9:00 AM",
    venue: "Innovation Lab",
    organizer: "Coding Club",
  },
  {
    id: 3,
    title: "Campus Placement Drive",
    date: "25 July 2026",
    time: "11:00 AM",
    venue: "Main Auditorium",
    organizer: "Placement Cell",
  },
];

export default function EventsPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <h1 className="text-3xl font-bold mb-2">
            🎉 Campus Events
          </h1>

          <p className="text-gray-600 mb-8">
            Stay updated with all upcoming college events.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition"
              >
                <h2 className="text-xl font-bold text-blue-600">
                  {event.title}
                </h2>

                <div className="mt-5 space-y-2 text-gray-700">
                  <p>📅 <strong>Date:</strong> {event.date}</p>
                  <p>⏰ <strong>Time:</strong> {event.time}</p>
                  <p>📍 <strong>Venue:</strong> {event.venue}</p>
                  <p>👨‍🏫 <strong>Organizer:</strong> {event.organizer}</p>
                </div>

                <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
                  Register
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}