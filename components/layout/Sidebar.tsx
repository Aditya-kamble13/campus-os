"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", icon: "🏠", label: "Dashboard" },
    { href: "/attendance", icon: "📚", label: "Attendance" },
    { href: "/assignments", icon: "📝", label: "Assignments" },
    { href: "/notes", icon: "📖", label: "Notes" },
    { href: "/timetable", icon: "📅", label: "Timetable" },
    { href: "/events", icon: "🎉", label: "Events" },
    { href: "/placement", icon: "💼", label: "Placements" },
    { href: "/profile", icon: "👤", label: "Profile" },
    { href: "/settings", icon: "⚙️", label: "Settings" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-blue-700 to-blue-900 text-white shadow-xl p-6">
      <h1 className="text-3xl font-extrabold text-center mb-10 tracking-wide">
        🎓 Campus OS
      </h1>

      <nav className="space-y-2">
        {links.map((link) => {
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                active
                  ? "bg-white text-blue-700 shadow-lg font-bold"
                  : "hover:bg-blue-600 hover:translate-x-2"
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-16 border-t border-blue-400 pt-6 text-center text-sm text-blue-200">
        <p>Campus OS v1.0</p>
        <p className="mt-1">Built with ❤️ using Next.js</p>
      </div>
    </aside>
  );
}