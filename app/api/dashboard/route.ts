export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    console.log("1");
    const assignmentCount = await prisma.assignment.count();

    console.log("2");
    const noteCount = await prisma.note.count();

    console.log("3");
    const announcementCount = await prisma.announcement.count();

    console.log("4");
    const timetableCount = await prisma.timetable.count();

    console.log("5");
    const attendance = await prisma.attendance.findMany();

    let overallAttendance = 0;

    if (attendance.length > 0) {
      overallAttendance =
        attendance.reduce((sum, item) => sum + item.percentage, 0) /
        attendance.length;
    }

    return NextResponse.json({
      assignmentCount,
      noteCount,
      announcementCount,
      timetableCount,
      overallAttendance: Math.round(overallAttendance),
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    return NextResponse.json(
      {
        error: String(error),
      },
      { status: 500 }
    );
  }
}