"use client";

export default function TestAssignmentPage() {
    async function createAssignment() {
        alert("Button Clicked!");
      
        try {
          const res = await fetch("/api/assignments", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: "DBMS Assignment 1",
              subject: "DBMS",
              dueDate: "2026-07-20",
              status: "Pending",
              userId: "cmr3bfq7w0000iuww43vhnm4p",
            }),
          });
      
          const data = await res.json();
      
          console.log(data);
          alert(data.message);
        } catch (err) {
          console.error(err);
          alert("Fetch Failed");
        }
      }

  return (
    <div className="p-10">
      <button
        onClick={createAssignment}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Create Test Assignment
      </button>
    </div>
  );
}