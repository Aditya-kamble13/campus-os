"use client";

import { useEffect, useState } from "react";

type Note = {
  id: string;
  title: string;
  subject: string;
  fileUrl: string;
};

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data);
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        Study Notes
      </h1>

      {notes.length === 0 ? (
        <p>No notes available.</p>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white rounded-xl shadow p-5"
            >
              <h2 className="text-xl font-bold">
                {note.title}
              </h2>

              <p>📘 Subject: {note.subject}</p>

              <a
                href={note.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                📄 Open Notes
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}