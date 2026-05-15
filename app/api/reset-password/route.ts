import { prisma } from "@/lib/prisma";

import bcrypt from "bcryptjs";

import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {
  try {
    const {
      token,
      password,
    } = await req.json();

    const user =
      await prisma.user.findFirst({
        where: {
          resetToken: token,

          resetTokenExpiry: {
            gt: new Date(),
          },
        },
      });

    if (!user) {
      return NextResponse.json(
        {
          message:
            "Invalid or expired token.",
        },
        { status: 400 }
      );
    }

    const hashed =
      await bcrypt.hash(
        password,
        10
      );

    await prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        password: hashed,

        resetToken: null,

        resetTokenExpiry:
          null,
      },
    });

    return NextResponse.json({
      message:
        "Password updated successfully.",
    });
  } catch {
    return NextResponse.json(
      {
        message:
          "Something went wrong.",
      },
      { status: 500 }
    );
  }
}