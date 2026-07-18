"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Student = {
  id: string;
  name: string;
  email: string;
};

export default function MarkAttendancePage() {
  const router = useRouter();

  const [students, setStudents] = useState<Student[]>([]);
  const [studentId, setStudentId] = useState("");
  const [subject, setSubject] = useState("");
  const [percentage, setPercentage] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    const res = await fetch("/api/students");
    const data = await res.json();
    setStudents(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      alert("Please login first.");
      return;
    }

    const user = JSON.parse(storedUser);

    const res = await fetch("/api/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentId,
        subject,
        percentage: Number(percentage),
        userId: user.id,
      }),
    });

    const data = await res.json();

    alert(data.message);

    if (res.ok) {
      router.push("/attendance");
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-8">
          📚 Mark Attendance
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <select
            className="w-full border rounded-lg p-3"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          >
            <option value="">Select Student</option>

            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name} ({student.email})
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Subject"
            className="w-full border rounded-lg p-3"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />

          <input
            type="number"
            min="0"
            max="100"
            placeholder="Attendance Percentage"
            className="w-full border rounded-lg p-3"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700"
          >
            ✅ Save Attendance
          </button>

        </form>
      </div>
    </main>
  );
}