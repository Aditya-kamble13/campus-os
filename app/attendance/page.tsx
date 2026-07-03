export default function AttendancePage() {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold">Attendance</h1>
  
        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold">
            Overall Attendance
          </h2>
  
          <p className="text-5xl font-bold text-blue-600 mt-4">
            92%
          </p>
        </div>
  
        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Subject Wise Attendance
          </h2>
  
          <div className="space-y-3">
            <p>📘 Mathematics - 95%</p>
            <p>💻 DBMS - 88%</p>
            <p>🖥 Operating System - 91%</p>
            <p>🤖 Artificial Intelligence - 97%</p>
            <p>🌐 Computer Networks - 85%</p>
          </div>
        </div>
      </div>
    );
  }