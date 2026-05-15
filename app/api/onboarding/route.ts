import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getAuthSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    const body = await req.json();

    const {
      role,
      curriculum,
      subjects,
    } = body;

    await prisma.user.update({
      where: {
        email: session.user.email,
      },

      data: {
        onboardingCompleted: true,

        rolePreference: role,

        curriculumPreference:
          curriculum,

        subjectPreferences:
          JSON.stringify(subjects),
      },
    });

    return NextResponse.json({
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