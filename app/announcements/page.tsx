"use client";

import { useEffect, useState } from "react";

type Announcement = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
};

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  async function fetchAnnouncements() {
    const res = await fetch("/api/announcements");
    const data = await res.json();
    setAnnouncements(data);
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        📢 Announcements
      </h1>

      {announcements.length === 0 ? (
        <p>No announcements available.</p>
      ) : (
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="bg-white rounded-xl shadow p-5"
            >
              <h2 className="text-xl font-bold">
                {announcement.title}
              </h2>

              <p className="mt-2 text-gray-700">
                {announcement.description}
              </p>

              <p className="mt-4 text-sm text-gray-500">
                📅 {announcement.createdAt.substring(0, 10)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}