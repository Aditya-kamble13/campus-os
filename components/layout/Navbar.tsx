export default function Navbar() {
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
      </div>
    </header>
  );
}