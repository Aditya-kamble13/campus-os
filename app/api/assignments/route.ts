
export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Create a new assignment
export async function POST(request: Request) {
  try {
    const { title, subject, dueDate, status, userId } =
      await request.json();

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
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Get all assignments
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
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Delete assignment
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Assignment ID is required" },
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
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}