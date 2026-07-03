"use client";

import { useState } from "react";

export default function FacultyPage() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");

  async function createAssignment() {
    const res = await fetch("/api/assignments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        subject,
        dueDate,
        status: "Pending",

        // Replace with your real user id
        userId: "cmr3bfq7w0000iuww43vhnm4p",
      }),
    });

    const data = await res.json();

    alert(data.message);

    if (res.ok) {
      setTitle("");
      setSubject("");
      setDueDate("");
    }
  }

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Create Assignment
      </h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Assignment Title"
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
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <button
          onClick={createAssignment}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Create Assignment
        </button>
      </div>
    </div>
  );
}