"use server";

import { prisma }
from "@/lib/prisma";

export async function deleteLesson(
  id: string
) {
  try {
    await prisma.lesson.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error(
      "Delete Error:",
      error
    );

    return {
      success: false,
    };
  }
}