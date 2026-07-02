import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <h1 className="text-3xl font-bold">
            Welcome, Aditya 👋
          </h1>

          <p className="text-gray-600 mt-2">
            Here's what's happening today.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-gray-500">Attendance</h2>
              <p className="text-3xl font-bold mt-2">85%</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-gray-500">Assignments</h2>
              <p className="text-3xl font-bold mt-2">3</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-gray-500">Classes Today</h2>
              <p className="text-3xl font-bold mt-2">5</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-gray-500">Events</h2>
              <p className="text-3xl font-bold mt-2">2</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}