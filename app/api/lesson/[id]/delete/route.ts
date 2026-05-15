import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // ✅ FIX

    await prisma.lesson.delete({
      where: { id },
    });

    const origin = req.headers.get("origin") || "http://localhost:3000";
return NextResponse.redirect(`${origin}/history`);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}