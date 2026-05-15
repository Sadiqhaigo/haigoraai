import OpenAI from "openai";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { formatContent } from "@/lib/formatContent";
import { getCurriculumGuide } from "@/lib/curriculumGuide";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(
      authOptions
    );

    if (!session?.user?.email) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // CURRENT USER
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return Response.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // FORM DATA
    const {
      curriculum,
      level,
      subject,
      topic,
      numberOfQuestions,
      assignmentType,
    } = await req.json();

    // CURRICULUM INTELLIGENCE
    const curriculumGuide =
  getCurriculumGuide(
    curriculum
  );

  // AI PROMPT
  const prompt = `
  You are an expert educator and assessment specialist.

  Generate a professional ${assignmentType}
  for the following educational context.
  
  Curriculum:
  ${curriculum}
  
  Curriculum Standards:
  ${curriculumGuide}
  
  Class / Level:
  ${level}
  
  Subject:
  ${subject}
  
  Topic:
  ${topic}
  
  Number of Questions:
  ${numberOfQuestions}
  
  Requirements:
  - Generate well-structured academic questions
  - Ensure alignment with the selected curriculum
  - Use professional educator formatting
  - Questions should match the learner level
  - Include clear instructions
  - Use appropriate difficulty progression
  - Ensure educational relevance and accuracy
  - Avoid repetition
  - Format neatly for classroom or take-home usage
  - If objective: include options A-D
  - If theory: include structured questions
  - If mixed: combine objective and theory
  - Add brief marking guide.
  - Avoid markdown symbols.
  
  Output Structure:
  1. Assignment Title
  2. Instructions
  3. Questions
  4. Submission Guidance
  `;

    // OPENAI REQUEST
    const response =
      await openai.chat.completions.create({
        model: "gpt-4.1-mini",

        messages: [
          {
            role: "system",
            content:
              "You are a professional educator and academic assessment expert.",
          },

          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.7,
      });

      const rawContent =
      response.choices[0].message.content || "";
    
      const assignmentContent =
      formatContent(rawContent);

    // SAVE TO DATABASE
    const lesson = await prisma.lesson.create({
      data: {
        subject,
        topic: `${topic} Assignment`,
        level,
        duration: `${numberOfQuestions} Questions`,

        curriculum,
        content: assignmentContent,

        contentType: "assignment",

        userType:
          user.role || "educator",

        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    // RETURN ID
    return Response.json({
      id: lesson.id,
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          "Failed to generate assignment",
      },
      { status: 500 }
    );
  }
}