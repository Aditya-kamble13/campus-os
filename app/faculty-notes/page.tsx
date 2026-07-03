"use client";

import { useState } from "react";

export default function FacultyNotesPage() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  async function createNote() {
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        subject,
        fileUrl,
        userId: "cmr3bfq7w0000iuww43vhnm4p", // Your existing user ID
      }),
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      setTitle("");
      setSubject("");
      setFileUrl("");
    }
  }

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Add Notes</h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          placeholder="PDF URL"
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <button
          onClick={createNote}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Save Note
        </button>
      </div>
    </div>
  );
}