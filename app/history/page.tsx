import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import Link from "next/link";
import AppLayout from "@/components/AppLayout";

export default async function HistoryPage() {
  const session = await getServerSession(
    authOptions
  );

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    redirect("/login");
  }

  const lessons =
    await prisma.lesson.findMany({
      where: {
        userId: user.id,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  const getBadge = (type: string) => {
    switch (type) {
      case "assignment":
        return {
          icon: "📝",
          label: "Assignment",
          color: "#7c3aed",
        };

      case "test":
        return {
          icon: "📋",
          label: "Test",
          color: "#059669",
        };

      case "exam":
        return {
          icon: "🎓",
          label: "Examination",
          color: "#dc2626",
        };

      default:
        return {
          icon: "📘",
          label: "Lesson",
          color: "#2563eb",
        };
    }
  };

  return (
    <AppLayout role={user.role}>
      {/* HERO */}
      <section style={styles.hero}>
        <div>
          <p style={styles.badge}>
            Academic History
          </p>

          <h1 style={styles.title}>
            Your Generated Content
          </h1>

          <p style={styles.subtitle}>
            Access and manage all your
            generated Contents.
          </p>
        </div>
      </section>

      {/* EMPTY STATE */}
      {lessons.length === 0 && (
        <div style={styles.emptyCard}>
          <div style={styles.emptyIcon}>
            📚
          </div>

          <h2>No Content Yet</h2>

          <p>
            Start generating academic content
            using HaigoraAI.
          </p>
        </div>
      )}

      {/* HISTORY GRID */}
      <div style={styles.grid}>
        {lessons.map((lesson) => {
          const badge = getBadge(
            lesson.contentType || "lesson"
          );

          return (
            <Link
              key={lesson.id}
              href={`/history/${lesson.id}`}
              style={styles.card}
            >
              {/* TOP */}
              <div style={styles.cardTop}>
                <div
                  style={{
                    ...styles.typeBadge,
                    background: badge.color,
                  }}
                >
                  {badge.icon} {badge.label}
                </div>

                <div style={styles.date}>
                  {new Date(
                    lesson.createdAt
                  ).toLocaleDateString()}
                </div>
              </div>

              {/* CONTENT */}
              <h2 style={styles.subject}>
                {lesson.subject}
              </h2>

              <p style={styles.topic}>
                {lesson.topic}
              </p>

              <div style={styles.meta}>
                <span>
                  🎓 {lesson.level}
                </span>

                <span>
                  ⏱ {lesson.duration}
                </span>
              </div>

              {/* CTA */}
              <div style={styles.viewBtn}>
                Open Content →
              </div>
            </Link>
          );
        })}
      </div>
    </AppLayout>
  );
}

const styles: any = {
  hero: {
    background:
      "linear-gradient(135deg,#111827,#1e3a8a)",

    borderRadius: 30,

    padding: 30,

    color: "#fff",

    marginBottom: 35,
  },

  badge: {
    display: "inline-block",

    background:
      "rgba(255,255,255,0.1)",

    padding: "8px 14px",

    borderRadius: 30,

    fontSize: 13,

    marginBottom: 18,
  },

  title: {
    fontSize:
    "clamp(30px,6vw,42px)",
    marginBottom: 12,
  },

  subtitle: {
    fontSize: "clamp(15px,2vw,18px)",
    lineHeight: 1.7,
    maxWidth: 700,
    opacity: 0.92,
  },

  grid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(320px,1fr))",

    gap: 24,
  },

  card: {
    background: "#fff",
  
    borderRadius: 24,
  
    padding: "clamp(18px,4vw,24px)",
  
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.05)",
  
    border:
      "1px solid #f1f5f9",
    overflow: "hidden",
    transition: "all 0.2s ease",
    cursor: "pointer",
  },

  cardTop: {
    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    flexWrap: "wrap",

    gap: 10,
  },

  typeBadge: {
    color: "#fff",

    padding: "8px 14px",

    borderRadius: 30,

    fontSize: 13,

    fontWeight: 700,
  },

  date: {
    color: "#6b7280",
    fontSize: 14,
  },

  subject: {
    margin: 0,
    fontSize: 26,
    color: "#475569",
  },

  topic: {
    margin: 0,
    color: "#475569",
    lineHeight: 1.7,
  },

  meta: {
    display: "flex",

    gap: 10,

    flexWrap: "wrap",

    color: "#64748b",

    fontSize: 14,
    marginTop: 10,
  },

  viewBtn: {
    marginTop: "auto",

    color: "#2563eb",

    fontWeight: 700,
  },

  emptyCard: {
    background: "#fff",
    color: "#000",

    borderRadius: 24,

    padding: 40,

    textAlign: "center",

    boxShadow:
      "0 10px 25px rgba(0,0,0,0.06)",
  },

  emptyIcon: {
    fontSize: 60,
    marginBottom: 15,
    textAlign: "center",
    padding: "clamp(30px,6vw,60px)",
  },
};