"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Assignment = {
  id: string;
  title: string;
  subject: string;
  status: string;
  dueDate: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetchAssignments();
  }, []);

  async function fetchAssignments() {
    const res = await fetch("/api/assignments");
    const data = await res.json();
    setAssignments(data);
  }

  async function deleteAssignment(id: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this assignment?"
    );

    if (!confirmDelete) return;

    const res = await fetch(`/api/assignments?id=${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    alert(data.message);

    if (res.ok) {
      fetchAssignments();
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Assignments
        </h1>

        {(user?.role === "FACULTY" || user?.role === "ADMIN") && (
          <Link
            href="/assignments/create"
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
          >
            ➕ Create Assignment
          </Link>
        )}
      </div>

      {assignments.length === 0 ? (
        <p>No assignments found.</p>
      ) : (
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="bg-white rounded-xl shadow p-5"
            >
              <h2 className="text-xl font-bold">
                {assignment.title}
              </h2>

              <p>📘 Subject: {assignment.subject}</p>

              <p>📅 Due Date: {assignment.dueDate.substring(0, 10)}</p>

              <p>📌 Status: {assignment.status}</p>

              {(user?.role === "FACULTY" || user?.role === "ADMIN") && (
                <button
                  onClick={() => deleteAssignment(assignment.id)}
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  🗑 Delete Assignment
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}