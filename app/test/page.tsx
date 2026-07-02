"use client";

export default function TestPage() {
  async function testApi() {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Aditya",
        email: "aditya3@gmail.com",
        password: "Adi@123",
        role: "STUDENT",
      }),
    });

    const data = await res.json();

    console.log(data);

    alert(data.message);
  }

  return (
    <div className="p-10">
      <button
        onClick={testApi}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Test Signup API
      </button>
    </div>
  );
}