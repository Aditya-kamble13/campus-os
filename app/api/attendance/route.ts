export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// =======================
// Mark Attendance
// =======================
export async function POST(request: Request) {
  try {
    const { studentId, subject, percentage, userId } =
      await request.json();

    // Check logged-in user
    const loggedInUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!loggedInUser) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // Only Faculty & Admin can mark attendance
    if (
      loggedInUser.role !== "FACULTY" &&
      loggedInUser.role !== "ADMIN"
    ) {
      return NextResponse.json(
        {
          message: "Only Faculty or Admin can mark attendance.",
        },
        { status: 403 }
      );
    }

    // Check student exists
    const student = await prisma.user.findUnique({
      where: {
        id: studentId,
      },
    });

    if (!student) {
      return NextResponse.json(
        {
          message: "Student not found",
        },
        { status: 404 }
      );
    }

    if (student.role !== "STUDENT") {
      return NextResponse.json(
        {
          message: "Selected user is not a student.",
        },
        { status: 400 }
      );
    }

    const attendance = await prisma.attendance.create({
      data: {
        subject,
        percentage,
        userId: studentId,
      },
    });

    return NextResponse.json({
      message: "Attendance marked successfully!",
      attendance,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
// =======================
// Get Attendance
// =======================
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        {
          message: "User ID is required",
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // Student -> Only own attendance
    if (user.role === "STUDENT") {
      const attendance = await prisma.attendance.findMany({
        where: {
          userId: user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return NextResponse.json(attendance);
    }

    // Faculty/Admin -> All attendance with student info
    const attendance = await prisma.attendance.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(attendance);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
// =======================
// Delete Attendance
// =======================
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          message: "Attendance ID is required",
        },
        { status: 400 }
      );
    }

    await prisma.attendance.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Attendance deleted successfully!",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}