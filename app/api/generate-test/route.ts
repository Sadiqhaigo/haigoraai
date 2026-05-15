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
      numberOfQuestions,
      testType,
      duration,
      difficulty,
    } = await req.json();

    // CURRICULUM INTELLIGENCE
    const curriculumGuide =
    getCurriculumGuide(
      curriculum
    );

    // AI PROMPT
    const prompt = `
You are an expert educator and assessment specialist.

Generate a professional academic test.

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

TEST TYPE:
${testType}

NUMBER OF QUESTIONS:
${numberOfQuestions}

DURATION:
${duration}

DIFFICULTY:
${difficulty}

IMPORTANT REQUIREMENTS:

1. Follow curriculum standards strictly.

2. Ensure questions match the learner level.

3. Use professional educator formatting.

4. Add clear test instructions.

5. If objective:
- include options A-D

6. If theory:
- include structured theory questions

7. If mixed:
- combine objective and theory appropriately

8. Add marking guide or answer guide.

9. Avoid markdown symbols.

10. Format professionally for school usage.
`;

    const response =
      await openai.chat.completions.create({
        model: "gpt-4.1-mini",

        messages: [
          {
            role: "system",
            content:
              "You are a professional academic test generator.",
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
    
    const testContent =
      formatContent(rawContent);

    // SAVE
    const lesson = await prisma.lesson.create({
      data: {
        subject,
        topic: `${topic} Test`,
        level,
        duration,

        curriculum,
        
        content: testContent,

        userType:
          user.role || "educator",

        contentType: "test",

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
        error: "Failed to generate test",
      },
      { status: 500 }
    );
  }
}