import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request
) {
  try {
    const url =
      new URL(req.url);

    const id =
      url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    await prisma.lesson.deleteMany({
      where: {
        userId: id,
      },
    });

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return Response.json({
      success: true,
    });
    
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}