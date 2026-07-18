"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateNotePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      alert("Please login first.");
      return;
    }

    const user = JSON.parse(storedUser);

    const res = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        subject,
        fileUrl,
        userId: user.id,
      }),
    });

    const data = await res.json();

    alert(data.message);

    if (res.ok) {
      router.push("/notes");
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-8">
          📖 Upload Note
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Note Title"
            className="w-full border rounded-lg p-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Subject"
            className="w-full border rounded-lg p-3"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />

          <input
            type="url"
            placeholder="PDF URL"
            className="w-full border rounded-lg p-3"
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white rounded-lg p-3 hover:bg-green-700"
          >
            📤 Upload Note
          </button>
        </form>
      </div>
    </main>
  );
}