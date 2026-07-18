"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePlacementPage() {
  const router = useRouter();

  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [salaryPackage, setSalaryPackage] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [location, setLocation] = useState("");
  const [applyLink, setApplyLink] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      alert("Please login first.");
      return;
    }

    const user = JSON.parse(storedUser);

    const res = await fetch("/api/placements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyName,
        role,
        package: salaryPackage,
        eligibility,
        location,
        applyLink,
        userId: user.id,
      }),
    });

    const data = await res.json();

    alert(data.message);

    if (res.ok) {
      router.push("/placement");
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl">

        <h1 className="text-3xl font-bold text-center mb-8">
          💼 Add Placement Drive
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            placeholder="Company Name"
            className="w-full border rounded-lg p-3"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Job Role"
            className="w-full border rounded-lg p-3"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Package (Example: 12 LPA)"
            className="w-full border rounded-lg p-3"
            value={salaryPackage}
            onChange={(e) => setSalaryPackage(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Eligibility (Example: CGPA 7+)"
            className="w-full border rounded-lg p-3"
            value={eligibility}
            onChange={(e) => setEligibility(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Location"
            className="w-full border rounded-lg p-3"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <input
            type="url"
            placeholder="Apply Link"
            className="w-full border rounded-lg p-3"
            value={applyLink}
            onChange={(e) => setApplyLink(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700"
          >
            🚀 Publish Placement Drive
          </button>

        </form>

      </div>
    </main>
  );
}