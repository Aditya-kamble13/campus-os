export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// =======================
// Create Note
// =======================
export async function POST(request: Request) {
  try {
    const { title, subject, fileUrl, userId } =
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

    // Only Faculty & Admin can upload notes
    if (user.role !== "FACULTY" && user.role !== "ADMIN") {
      return NextResponse.json(
        {
          message: "Only Faculty or Admin can upload notes.",
        },
        { status: 403 }
      );
    }

    const note = await prisma.note.create({
      data: {
        title,
        subject,
        fileUrl,
        userId,
      },
    });

    return NextResponse.json({
      message: "Note uploaded successfully!",
      note,
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
// Get All Notes
// =======================
export async function GET() {
  try {
    const notes = await prisma.note.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(notes);
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
// Delete Note
// =======================
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          message: "Note ID is required",
        },
        { status: 400 }
      );
    }

    await prisma.note.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Note deleted successfully!",
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