"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetchAnnouncements();
  }, []);

  async function fetchAnnouncements() {
    const res = await fetch("/api/announcements");
    const data = await res.json();
    setAnnouncements(data);
  }

  async function deleteAnnouncement(id: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this announcement?"
    );

    if (!confirmDelete) return;

    const res = await fetch(`/api/announcements?id=${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    alert(data.message);

    if (res.ok) {
      fetchAnnouncements();
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          📢 Announcements
        </h1>

        {(user?.role === "FACULTY" || user?.role === "ADMIN") && (
          <Link
            href="/announcements/create"
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
          >
            ➕ Create Announcement
          </Link>
        )}
      </div>

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

              <p className="mt-3 text-gray-700">
                {announcement.description}
              </p>

              <p className="mt-4 text-sm text-gray-500">
                📅{" "}
                {new Date(
                  announcement.createdAt
                ).toLocaleDateString()}
              </p>

              {(user?.role === "FACULTY" || user?.role === "ADMIN") && (
                <button
                  onClick={() => deleteAnnouncement(announcement.id)}
                  className="mt-5 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  🗑 Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}