import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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