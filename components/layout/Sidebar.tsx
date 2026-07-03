import Link from "next/link";
export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-blue-600 text-white p-6">
      <h2 className="text-3xl font-bold mb-10">
        Campus OS
      </h2>
      <nav className="space-y-5 text-lg">
  <Link href="/dashboard" className="block hover:text-gray-200">
    🏠 Dashboard
  </Link>

  <Link href="/attendance" className="block hover:text-gray-200">
    📚 Attendance
  </Link>

  <Link href="/assignments" className="block hover:text-gray-200">
    📝 Assignments
  </Link>

  <Link href="/notes" className="block hover:text-gray-200">
    📖 Notes
  </Link>

  <Link href="/timetable" className="block hover:text-gray-200">
    📅 Timetable
  </Link>

  <Link href="/events" className="block hover:text-gray-200">
    🎉 Events
  </Link>

  <Link href="/placement" className="block hover:text-gray-200">
    💼 Placements
  </Link>

  <Link href="/profile" className="block hover:text-gray-200">
    👤 Profile
  </Link>

  <Link href="/settings" className="block hover:text-gray-200">
    ⚙️ Settings
  </Link>
</nav>
    </aside>
  );
}