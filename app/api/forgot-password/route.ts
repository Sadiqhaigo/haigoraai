import { prisma } from "@/lib/prisma";

import crypto from "crypto";

import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {
  try {
    const { email } =
      await req.json();

    const user =
      await prisma.user.findUnique({
        where: { email },
      });

    if (!user) {
      return NextResponse.json({
        message:
          "If the account exists, a reset link has been generated.",
      });
    }

    const token =
      crypto.randomBytes(32).toString(
        "hex"
      );

    const expiry =
      new Date(
        Date.now() +
          1000 *
            60 *
            30
      );

    await prisma.user.update({
      where: { email },

      data: {
        resetToken: token,

        resetTokenExpiry:
          expiry,
      },
    });

    console.log(
      `Reset Link: http://localhost:3000/reset-password/${token}`
    );

    return NextResponse.json({
      message:
        "Password reset link generated. Check terminal for now.",
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