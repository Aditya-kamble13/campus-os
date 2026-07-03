import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Create Attendance
export async function POST(request: Request) {
  try {
    const { subject, percentage, userId } = await request.json();

    const attendance = await prisma.attendance.create({
      data: {
        subject,
        percentage,
        userId,
      },
    });

    return NextResponse.json({
      message: "Attendance added successfully!",
      attendance,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Get Attendance
export async function GET() {
  try {
    const attendance = await prisma.attendance.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(attendance);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}