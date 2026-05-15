import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {
  try {
    const body =
      await req.json();

    const { id } = body;

    if (!id) {
      return NextResponse.json(
        {
          error:
            "Lesson ID is required",
        },
        { status: 400 }
      );
    }

    const existing =
      await prisma.lesson.findUnique({
        where: { id },
      });

    if (!existing) {
      return NextResponse.json(
        {
          error:
            "Lesson not found",
        },
        { status: 404 }
      );
    }

    await prisma.lesson.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to delete lesson",
      },
      { status: 500 }
    );
  }
}