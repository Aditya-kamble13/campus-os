export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-blue-600 text-white p-6">
      <h2 className="text-3xl font-bold mb-10">
        Campus OS
      </h2>

      <nav className="space-y-5 text-lg">
        <p>🏠 Dashboard</p>
        <p>📚 Attendance</p>
        <p>📝 Assignments</p>
        <p>📖 Notes</p>
        <p>📅 Timetable</p>
        <p>🎉 Events</p>
        <p>💼 Placements</p>
        <p>⚙ Settings</p>
      </nav>
    </aside>
  );
}