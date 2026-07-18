export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// =======================
// Create Assignment
// =======================
export async function POST(request: Request) {
  try {
    const { title, subject, dueDate, status, userId } =
      await request.json();

    // Check user exists
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

    // Only Faculty & Admin can create assignments
    if (user.role !== "FACULTY" && user.role !== "ADMIN") {
      return NextResponse.json(
        {
          message: "Only Faculty or Admin can create assignments.",
        },
        { status: 403 }
      );
    }

    const assignment = await prisma.assignment.create({
      data: {
        title,
        subject,
        dueDate: new Date(dueDate),
        status,
        userId,
      },
    });

    return NextResponse.json({
      message: "Assignment created successfully!",
      assignment,
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
// Get All Assignments
// =======================
export async function GET() {
  try {
    const assignments = await prisma.assignment.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(assignments);
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
// Delete Assignment
// =======================
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          message: "Assignment ID is required",
        },
        { status: 400 }
      );
    }

    await prisma.assignment.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Assignment deleted successfully!",
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