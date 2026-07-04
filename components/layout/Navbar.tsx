"use client";

export default function Navbar() {
  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    alert("Logged out successfully!");

    window.location.href = "/login";
  }

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      <h1 className="text-2xl font-bold text-blue-600">
        Campus OS
      </h1>

      <div className="flex items-center gap-5">
        <button className="text-2xl">🔔</button>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
            A
          </div>

          <span className="font-semibold">
            Aditya
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
}