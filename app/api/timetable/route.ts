import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Create Timetable Entry
export async function POST(request: Request) {
  try {
    const {
      day,
      subject,
      facultyName,
      room,
      startTime,
      endTime,
    } = await request.json();

    const timetable = await prisma.timetable.create({
      data: {
        day,
        subject,
        facultyName,
        room,
        startTime,
        endTime,
      },
    });

    return NextResponse.json({
      message: "Timetable added successfully!",
      timetable,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Get Timetable
export async function GET() {
  try {
    const timetable = await prisma.timetable.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(timetable);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}