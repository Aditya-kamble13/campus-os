"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

type Placement = {
  id: string;
  companyName: string;
  role: string;
  package: string;
  eligibility: string;
  location: string;
  applyLink: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function PlacementPage() {
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetchPlacements();
  }, []);

  async function fetchPlacements() {
    const res = await fetch("/api/placements");
    const data = await res.json();
    setPlacements(data);
  }

  async function deletePlacement(id: string) {
    if (!confirm("Delete this placement drive?")) return;

    const res = await fetch(`/api/placements?id=${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    alert(data.message);

    if (res.ok) {
      fetchPlacements();
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">

          <div className="flex justify-between items-center mb-8">

            <div>
              <h1 className="text-3xl font-bold">
                💼 Placement Opportunities
              </h1>

              <p className="text-gray-600 mt-2">
                Latest campus placement drives.
              </p>
            </div>

            {(user?.role === "FACULTY" || user?.role === "ADMIN") && (
              <Link
                href="/placement/create"
                className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
              >
                ➕ Add Placement
              </Link>
            )}

          </div>

          {placements.length === 0 ? (
            <p>No placement drives available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {placements.map((placement) => (

                <div
                  key={placement.id}
                  className="bg-white rounded-xl shadow-lg p-6"
                >

                  <h2 className="text-2xl font-bold text-blue-600">
                    {placement.companyName}
                  </h2>

                  <div className="space-y-2 mt-4">

                    <p>
                      <strong>💼 Role:</strong> {placement.role}
                    </p>

                    <p>
                      <strong>💰 Package:</strong> {placement.package}
                    </p>

                    <p>
                      <strong>🎓 Eligibility:</strong>{" "}
                      {placement.eligibility}
                    </p>

                    <p>
                      <strong>📍 Location:</strong>{" "}
                      {placement.location}
                    </p>

                  </div>

                  <div className="mt-6 flex gap-3">

                    <a
                      href={placement.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-600 text-white text-center py-3 rounded-lg hover:bg-green-700"
                    >
                      Apply Now
                    </a>

                    {(user?.role === "FACULTY" ||
                      user?.role === "ADMIN") && (

                      <button
                        onClick={() =>
                          deletePlacement(placement.id)
                        }
                        className="bg-red-600 text-white px-4 rounded-lg hover:bg-red-700"
                      >
                        Delete
                      </button>

                    )}

                  </div>

                </div>

              ))}

            </div>
          )}

        </main>
      </div>
    </div>
  );
}