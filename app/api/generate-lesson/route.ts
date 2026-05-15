import { NextResponse } from "next/server";
import OpenAI from "openai";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { formatContent } from "@/lib/formatContent";
import { getCurriculumGuide } from "@/lib/curriculumGuide";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const {
      subject,
      topic,
      level,
      duration,
      curriculum,
      term,
      week,
    } = await req.json();

    // 🔐 AUTH
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 👤 AUTO USER DATA
    const author = user.name;
    const role = user.role;
    const state = user.state;

    // CURRICULUM INTELLIGENCE
const curriculumGuide =
getCurriculumGuide(
  curriculum
);

// AI PROMPT
const prompt = `
You are an expert educator, lecturer and curriculum specialist.

Generate a detailed professional lesson note.

CURRICULUM:
${curriculum}

LEVEL:
${level}

SUBJECT:
${subject}

TOPIC:
${topic}

DURATION:
${duration}

TERM / SEMESTER:
${term}

WEEK:
${week}

IMPORTANT CURRICULUM INSTRUCTION:
${curriculumGuide}

IMPORTANT REQUIREMENTS:

1. Generate a highly detailed, curriculum-aligned and professionally structured lesson or lecture note.

2. The content must strictly follow:
- the selected curriculum
- the academic level
- institutional learning standards
- appropriate educational depth

3. Use a dual-purpose academic teaching approach:

A. Teacher/Lecturer Guide:
- Include instructional guidance
- teaching explanations
- classroom delivery support
- examples and illustrations
- learner engagement strategies
- evaluation guidance

B. Student Learning Note:
- Include rich explanatory academic content
- clear definitions and explanations
- detailed examples
- structured notes students can copy into their notebooks
- revision-ready learning material
- examination preparation support

4. The generated content must therefore serve both:
- as a professional classroom teaching guide
- and as a complete learner study note.

5. Do not generate only skeletal outlines or brief teaching points.

6. Provide deep explanatory content suitable for:
- direct classroom teaching
- lecture delivery
- student note-taking
- assignment preparation
- examination revision

7. Include where appropriate:
- lesson/lecture objectives
- introduction
- detailed explanations
- examples
- classroom activities
- practice exercises
- evaluation questions
- summary/conclusion

8. The tone and complexity must match the selected educational category:
- Primary School
- Secondary School
- Polytechnic
- College of Education
- University
- Nursing/Health Institution
- Legal Education

9. For technical, medical, legal and higher institution curricula:
- use professional terminologies
- practical applications
- academic depth
- industry-relevant explanations

10. The output must be:
- classroom-ready
- academically professional
- well-organized
- readable
- educationally engaging

11. Avoid markdown symbols such as:
###, ***, ---

12. Format the lesson or lecture note cleanly with proper headings and spacing.
`;

    // 🤖 AI CALL
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an expert educator." },
        { role: "user", content: prompt },
      ],
    });

    const rawContent =
  response.choices[0].message.content || "";

const lessonContent =
  formatContent(rawContent);

    // 💾 SAVE
    const lesson = await prisma.lesson.create({
      data: {
        subject,
        topic,
        level,
        duration,

        curriculum,

        content: lessonContent,
        
        userType: user?.role || "educator",

        contentType: "lesson",
    
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
    return NextResponse.json(
      { error: "Failed to generate lesson" },
      { status: 500 }
    );
  }
}