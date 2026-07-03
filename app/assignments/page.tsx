"use client";

import { useEffect, useState } from "react";

type Assignment = {
  id: string;
  title: string;
  subject: string;
  status: string;
  dueDate: string;
};

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
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
      <h1 className="text-3xl font-bold mb-8">
        Assignments
      </h1>

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

              <button
                onClick={() => deleteAssignment(assignment.id)}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                🗑 Delete Assignment
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}