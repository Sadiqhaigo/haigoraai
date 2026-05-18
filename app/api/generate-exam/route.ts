import OpenAI from "openai";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions }
from "@/lib/auth";
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

    const {
      curriculum,
      level,
      subject,
      topic,
      examType,
      sections,
      numberOfQuestions,
      duration,
      difficulty,
    } = await req.json();

    const curriculumGuide =
      getCurriculumGuide(
        curriculum
      );

      const prompt = `
      You are an expert examination officer and academic assessment specialist.
      
      Generate a professional examination paper.
      
      CURRICULUM:
      ${curriculum}
      
      CURRICULUM STANDARDS:
      ${curriculumGuide}
      
      LEVEL:
      ${level}
      
      SUBJECT:
      ${subject}
      
      TOPIC:
      ${topic}
      
      EXAMINATION TYPE:
      ${examType}
      
      NUMBER OF QUESTIONS:
      ${numberOfQuestions}
      
      DURATION:
      ${duration}

      SECTIONS:
      ${sections}
      
      DIFFICULTY:
      ${difficulty}
      
      IMPORTANT REQUIREMENTS:
      
      1. Follow the selected curriculum strictly.
      
      2. Add professional examination heading.
      
      3. Add candidate instructions clearly.
      
      4. Ensure questions match the learner level.
      
      5. If objective:
      - provide options A-D
      
      6. If subjective:
      - provide structured theory sections
      
      7. If mixed:
      - combine objective and theory professionally
      
      8. Add marks allocation.
      
      9. Add brief answer guide or marking guide.
      
      10. Avoid markdown symbols.
      
      11. Format like a professional examination paper suitable for schools and institutions.

      12. Divide the examination properly into the specified number of sections.

      13. Label sections clearly as:
      - Section A
      - Section B
      - Section C

      14. Ensure proper distribution of questions across sections.
      `;

    const response =
      await openai.chat.completions.create({
        model: "gpt-4.1-mini",

        messages: [
          {
            role: "system",
            content:
              "You are a professional examination generator.",
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
    
    const examContent =
      formatContent(rawContent);

    const lesson = await prisma.lesson.create({
      data: {
        subject,
        topic: `${topic} Examination`,
        level,
        duration,
        curriculum,
        content: examContent,

        contentType: "exam",

        userType:
          user.role || "educator",

        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return Response.json({
      id: lesson.id,
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          "Failed to generate examination",
      },
      { status: 500 }
    );
  }
}