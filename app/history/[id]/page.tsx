import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect, notFound } from "next/navigation";
import FormattedContent from "@/components/FormattedContent";
import { exportPDF } from "@/lib/exportPDF";

import AppLayout from "@/components/AppLayout";
import LessonActions from "@/components/LessonActions";
import { exportAcademicDoc } from "@/lib/exportAcademicDoc";

export default async function LessonDetailPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const { id } = await params;

  const lesson = await prisma.lesson.findUnique({
    where: {
      id,
    },
  
    include: {
      user: true,
    },
  });

  if (!lesson) {
    return notFound();
  }

  return (
      <AppLayout
        role={lesson.user?.role}
      >
        {/* HERO */}
        <div style={styles.hero}>
          <h1 style={styles.title}>
            {lesson.topic}
          </h1>
    
          <p style={styles.meta}>
            {lesson.subject}
          </p>
        </div>
    
        {/* ACTIONS */}
        <LessonActions
          id={lesson.id}
          title={lesson.topic}
          content={lesson.content}
        />
    
        {/* CONTENT */}
        <div style={styles.contentCard}>
          <FormattedContent
            content={lesson.content}
          />
        </div>
      </AppLayout>
    );
}

const styles: any = {
  hero: {
    background:
      "linear-gradient(135deg,#2563eb,#1e3a8a)",
    borderRadius: 28,
    padding: 40,
    color: "#fff",
    marginBottom: 30,
  },

  badge: {
    display: "inline-block",
    background: "rgba(255,255,255,0.15)",
    padding: "8px 14px",
    borderRadius: 30,
    fontSize: 13,
    marginBottom: 18,
  },

  title: {
    fontSize: 42,
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 18,
    opacity: 0.92,
  },

  actionsWrapper: {
    position: "sticky",
    top: 20,
    zIndex: 100,
    marginBottom: 25,
  },

  contentCard: {
    background: "#fff",
    borderRadius: 28,
    padding: 40,
    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
    marginBottom: 40,
  },

  lessonContent: {
    whiteSpace: "pre-wrap",
    lineHeight: 1.9,
    color: "#1f2937",
    fontSize: 16,
  },
};