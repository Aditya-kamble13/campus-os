"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800 text-white flex items-center justify-center px-6">
      <div className="max-w-5xl w-full text-center">

        <h1 className="text-6xl font-extrabold">
          🎓 Campus OS
        </h1>

        <p className="mt-6 text-xl text-gray-200">
          One Platform for Students, Faculty and Administration.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">

          <div className="bg-white text-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold">📚 Attendance</h2>
            <p className="mt-2 text-gray-600">
              Track overall and subject-wise attendance.
            </p>
          </div>

          <div className="bg-white text-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold">📝 Assignments</h2>
            <p className="mt-2 text-gray-600">
              Submit and manage assignments with ease.
            </p>
          </div>

          <div className="bg-white text-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold">📢 Announcements</h2>
            <p className="mt-2 text-gray-600">
              Stay updated with the latest college notices.
            </p>
          </div>

          <div className="bg-white text-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold">📄 Notes</h2>
            <p className="mt-2 text-gray-600">
              Access study materials anytime.
            </p>
          </div>

          <div className="bg-white text-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold">💼 Placement</h2>
            <p className="mt-2 text-gray-600">
              View placement opportunities and apply.
            </p>
          </div>

          <div className="bg-white text-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold">📅 Timetable</h2>
            <p className="mt-2 text-gray-600">
              Check your class schedule instantly.
            </p>
          </div>

        </div>

        <div className="mt-12 flex justify-center gap-5 flex-wrap">

          {!loggedIn ? (
            <>
              <Link
                href="/login"
                className="bg-white text-blue-700 font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="bg-green-500 text-white font-bold px-8 py-3 rounded-xl hover:bg-green-600 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <Link
              href="/dashboard"
              className="bg-yellow-400 text-black font-bold px-8 py-3 rounded-xl hover:bg-yellow-500 transition"
            >
              Go to Dashboard →
            </Link>
          )}

        </div>

      </div>
    </main>
  );
}