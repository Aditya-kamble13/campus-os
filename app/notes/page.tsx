"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Note = {
  id: string;
  title: string;
  subject: string;
  fileUrl: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetchNotes();
  }, []);

  async function fetchNotes() {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data);
  }

  async function deleteNote(id: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmDelete) return;

    const res = await fetch(`/api/notes?id=${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    alert(data.message);

    if (res.ok) {
      fetchNotes();
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          📖 Study Notes
        </h1>

        {(user?.role === "FACULTY" || user?.role === "ADMIN") && (
          <Link
            href="/notes/create"
            className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
          >
            ➕ Upload Note
          </Link>
        )}
      </div>

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

              <p className="mt-2">
                📘 Subject: {note.subject}
              </p>

              <div className="flex gap-3 mt-5">
                <a
                  href={note.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  📄 Open Notes
                </a>

                {(user?.role === "FACULTY" || user?.role === "ADMIN") && (
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    🗑 Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}