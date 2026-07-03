import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Create Note
export async function POST(request: Request) {
  try {
    const { title, subject, fileUrl, userId } =
      await request.json();

    const note = await prisma.note.create({
      data: {
        title,
        subject,
        fileUrl,
        userId,
      },
    });

    return NextResponse.json({
      message: "Note added successfully!",
      note,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Get Notes
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
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}