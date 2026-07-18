export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [
      students,
      faculty,
      admins,
      assignments,
      notes,
      announcements,
      placements,
      attendance,
    ] = await Promise.all([
      prisma.user.count({
        where: { role: "STUDENT" },
      }),
      prisma.user.count({
        where: { role: "FACULTY" },
      }),
      prisma.user.count({
        where: { role: "ADMIN" },
      }),
      prisma.assignment.count(),
      prisma.note.count(),
      prisma.announcement.count(),
      prisma.placement.count(),
      prisma.attendance.count(),
    ]);

    return NextResponse.json({
      students,
      faculty,
      admins,
      assignments,
      notes,
      announcements,
      placements,
      attendance,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}