export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// =======================
// Create Placement
// =======================
export async function POST(request: Request) {
  try {
    const {
      companyName,
      role,
      package: salaryPackage,
      eligibility,
      location,
      applyLink,
      userId,
    } = await request.json();

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    if (user.role !== "FACULTY" && user.role !== "ADMIN") {
      return NextResponse.json(
        {
          message: "Only Faculty or Admin can create placement drives.",
        },
        { status: 403 }
      );
    }

    const placement = await prisma.placement.create({
      data: {
        companyName,
        role,
        package: salaryPackage,
        eligibility,
        location,
        applyLink,
      },
    });

    return NextResponse.json({
      message: "Placement added successfully!",
      placement,
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
// Get Placements
// =======================
export async function GET() {
  try {
    const placements = await prisma.placement.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(placements);
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
// Delete Placement
// =======================
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          message: "Placement ID is required",
        },
        { status: 400 }
      );
    }

    await prisma.placement.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Placement deleted successfully!",
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