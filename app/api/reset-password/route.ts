import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(
  req: Request
) {
  try {
    const {
      token,
      password,
    } = await req.json();

    if (
      !token ||
      !password
    ) {
      return NextResponse.json(
        {
          message:
            "Token and password are required.",
        },
        {
          status: 400,
        }
      );
    }

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
            "Invalid or expired reset token.",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    await prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        password:
          hashedPassword,

        resetToken: null,

        resetTokenExpiry:
          null,
      },
    });

    return NextResponse.json({
      message:
        "Password reset successfully.",
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