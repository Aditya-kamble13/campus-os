import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Create Announcement
export async function POST(request: Request) {
  try {
    const { title, description } = await request.json();

    const announcement = await prisma.announcement.create({
      data: {
        title,
        description,
      },
    });

    return NextResponse.json({
      message: "Announcement created successfully!",
      announcement,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Get All Announcements
export async function GET() {
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(announcements);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}