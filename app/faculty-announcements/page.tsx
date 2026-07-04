"use client";

import { useState } from "react";

export default function FacultyAnnouncementsPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/announcements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    const data = await res.json();

    alert(data.message);

    if (res.ok) {
      setTitle("");
      setDescription("");
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        Faculty Announcement Panel
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <input
          type="text"
          placeholder="Announcement Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />

        <textarea
          placeholder="Announcement Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-3 rounded-lg h-40"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Publish Announcement
        </button>
      </form>
    </div>
  );
}