import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const assignmentCount = await prisma.assignment.count();
    const noteCount = await prisma.note.count();
    const announcementCount = await prisma.announcement.count();
    const timetableCount = await prisma.timetable.count();

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
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}