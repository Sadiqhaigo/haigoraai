import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth";

import { authOptions }
from "@/lib/auth";

import bcrypt from "bcryptjs";

import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {
  try {
    const session =
      await getServerSession(
        authOptions
      );

    if (
      !session?.user?.email
    ) {
      return NextResponse.json(
        {
          message:
            "Unauthorized",
        },
        { status: 401 }
      );
    }

    const {
      currentPassword,
      newPassword,
    } = await req.json();

    const user =
      await prisma.user.findUnique({
        where: {
          email:
            session.user.email,
        },
      });

    if (!user) {
      return NextResponse.json(
        {
          message:
            "User not found",
        },
        { status: 404 }
      );
    }

    const isMatch =
      await bcrypt.compare(
        currentPassword,
        user.password
      );

    if (!isMatch) {
      return NextResponse.json(
        {
          message:
            "Current password is incorrect",
        },
        { status: 400 }
      );
    }

    const hashed =
      await bcrypt.hash(
        newPassword,
        10
      );

    await prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        password: hashed,
      },
    });

    return NextResponse.json({
      message:
        "Password updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          "Something went wrong",
      },
      { status: 500 }
    );
  }
}