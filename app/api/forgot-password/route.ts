import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";

import { sendResetEmail }
from "@/lib/sendEmail";

export async function POST(
  req: Request
) {
  try {
    console.log(
      "Forgot password route hit"
    );

    const { email } =
      await req.json();

    const user =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (!user) {
      return NextResponse.json({
        message:
          "If an account exists, a reset link has been sent.",
      });
    }

    const token =
      crypto.randomBytes(32)
        .toString("hex");

    const expiry =
      new Date(
        Date.now() +
        1000 * 60 * 30
      );

    await prisma.user.update({
      where: {
        email,
      },

      data: {
        resetToken: token,

        resetTokenExpiry:
          expiry,
      },
    });

    const resetLink =
      `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

    await sendResetEmail(
      email,
      resetLink
    );

    return NextResponse.json({
      message:
        "Password reset email sent successfully.",
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        message:
          "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}