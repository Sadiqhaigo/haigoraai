import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import AppLayout from "@/components/AppLayout";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email || "",
    },
    include: {
      lessons: true,
    },
  });

  const totalLessons = user?.lessons.length || 0;

  const recentLessons = user?.lessons
    ?.slice(-3)
    .reverse();

  return (
    <AppLayout>
      {/* HERO */}
      <section style={styles.hero}>
        <div>
          <p style={styles.badge}>
            Educator Workspace
          </p>

          <h1 style={styles.heroTitle}>
            Welcome back, {user?.name}
          </h1>

          <p style={styles.heroText}>
            Generate smarter curriculum-aligned lessons faster.
          </p>
        </div>

        <div style={styles.avatar}>
          {user?.name?.charAt(0)}
        </div>
      </section>

      {/* PROFILE CARD */}
      <section style={styles.profileCard}>
        <div style={styles.profileLeft}>
          <div style={styles.profileAvatar}>
            {user?.name?.charAt(0)}
          </div>

          <div>
            <h2 style={styles.profileName}>
              {user?.name}
            </h2>

            <p style={styles.profileRole}>
              {user?.role} • {user?.state}
            </p>

            <p style={styles.profileEmail}>
              {user?.email}
            </p>
          </div>
        </div>

        <div style={styles.statusBox}>
          <p style={styles.statusLabel}>
            Account Status
          </p>

          <div style={styles.activeBadge}>
            Active
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={styles.statsGrid}>
        <div style={styles.statCard}>
          <p style={styles.statTitle}>
            Total Generated Content
          </p>

          <h2 style={styles.statValue}>
            {totalLessons}
          </h2>
        </div>

        <div style={styles.statCard}>
          <p style={styles.statTitle}>
            Curriculum Support
          </p>

          <h2 style={styles.statValue}>
            Standard
          </h2>
        </div>

        <div style={styles.statCard}>
          <p style={styles.statTitle}>
            Role Type
          </p>

          <h2 style={styles.statValue}>
            {user?.role}
          </h2>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section style={styles.section}>
        <div style={styles.sectionTop}>
          <div>
            <p style={styles.sectionMini}>
              QUICK ACTIONS
            </p>

            <h2 style={styles.sectionTitle}>
              Start Working
            </h2>
          </div>
        </div>

        <div style={styles.actionGrid}>
          <Link href="/lesson" style={styles.actionCard}>
            <div style={styles.actionIcon}>📘</div>

            <h3>Create Lesson</h3>

            <p>
              Generate detailed curriculum-aligned
              lesson and lecture notes.
            </p>
          </Link>

          <Link
            href="/assignment"
            style={styles.actionCard}
          >
            <div style={styles.actionIcon}>📝</div>

            <h3>Generate Assignment</h3>

            <p>
              Create take-home assignments,
              activities and practice tasks.
            </p>
          </Link>

          <Link href="/test" style={styles.actionCard}>
            <div style={styles.actionIcon}>📋</div>

            <h3>Generate Test</h3>

            <p>
              Build class tests, quizzes and
              assessments instantly.
            </p>
          </Link>

          <Link href="/exam" style={styles.actionCard}>
            <div style={styles.actionIcon}>🎓</div>

            <h3>Generate Examination</h3>

            <p>
              Create examination questions with
              structured sections and marking.
            </p>
          </Link>

          <Link
            href="/history"
            style={styles.actionCard}
          >
            <div style={styles.actionIcon}>📚</div>

            <h3>Lesson History</h3>

            <p>
              Access and manage previously
              generated lessons.
            </p>
          </Link>

          {user?.role === "admin" && (
            <Link
              href="/admin"
              style={styles.actionCard}
            >
              <div style={styles.actionIcon}>⚙️</div>

              <h3>Admin Panel</h3>

              <p>
                Manage users, lessons and platform
                activity.
              </p>
            </Link>
          )}
        </div>
      </section>

      {/* RECENT LESSONS */}
      <section style={styles.section}>
        <div style={styles.sectionTop}>
          <div>
            <p style={styles.sectionMini}>
              RECENT ACTIVITY
            </p>

            <h2 style={styles.sectionTitle}>
              Recent Lessons
            </h2>
          </div>
        </div>

        <div style={styles.lessonList}>
          {recentLessons && recentLessons.length > 0 ? (
            recentLessons.map((lesson) => (
              <div key={lesson.id} style={styles.lessonCard}>
                <div>
                  <h3 style={styles.lessonSubject}>
                    {lesson.subject}
                  </h3>

                  <p style={styles.lessonTopic}>
                    {lesson.topic}
                  </p>
                </div>

                <Link
                  href={`/history/${lesson.id}`}
                  style={styles.viewBtn}
                >
                  View
                </Link>
              </div>
            ))
          ) : (
            <div style={styles.emptyBox}>
              No lessons generated yet.
            </div>
          )}
        </div>
      </section>
    </AppLayout>
  );
}

const styles: any = {
  hero: {
    background:
      "linear-gradient(135deg,#2563eb,#1e3a8a)",

    color: "#fff",

    borderRadius: 28,

    padding:
      "clamp(24px,5vw,40px)",

    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",

    marginBottom: 30,

    flexWrap: "wrap",

    gap: 20,

    overflow: "hidden",
  },

  badge: {
    display: "inline-block",

    background:
      "rgba(255,255,255,0.15)",

    padding: "8px 14px",

    borderRadius: 30,

    marginBottom: 18,

    fontSize: 14,

    fontWeight: 600,
  },

  heroTitle: {
    fontSize:
      "clamp(28px,6vw,48px)",

    lineHeight: 1.1,

    marginBottom: 12,

    wordBreak: "break-word",
  },

  heroText: {
    fontSize:
      "clamp(15px,2vw,18px)",

    opacity: 0.92,

    lineHeight: 1.7,
  },

  avatar: {
    width:
      "clamp(70px,10vw,100px)",

    height:
      "clamp(70px,10vw,100px)",

    borderRadius: "50%",

    background:
      "rgba(255,255,255,0.15)",

    display: "flex",

    alignItems: "center",

    justifyContent:
      "center",

    fontSize:
      "clamp(28px,5vw,42px)",

    fontWeight: 700,

    flexShrink: 0,
  },

  profileCard: {
    background: "#fff",

    borderRadius: 24,

    padding:
      "clamp(20px,5vw,32px)",

    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",

    flexWrap: "wrap",

    gap: 20,

    marginBottom: 30,

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.05)",

    overflow: "hidden",
  },

  profileLeft: {
    display: "flex",

    alignItems: "center",

    gap: 18,

    flexWrap: "wrap",
  },

  profileAvatar: {
    width: 70,

    height: 70,

    borderRadius: "50%",

    background: "#2563eb",

    color: "#fff",

    display: "flex",

    alignItems: "center",

    justifyContent:
      "center",

    fontSize: 28,

    fontWeight: 700,

    flexShrink: 0,
  },

  profileName: {
    margin: 0,
    color: "#000",

    fontSize:
      "clamp(22px,4vw,30px)",
  },

  profileRole: {
    color: "#64748b",

    marginTop: 6,

    lineHeight: 1.6,
  },

  profileEmail: {
    color: "#64748b",

    marginTop: 6,

    wordBreak: "break-word",
  },

  statusBox: {
    background: "#f8fafc",

    padding: 20,

    borderRadius: 18,

    minWidth: 180,
  },

  statusLabel: {
    color: "#64748b",

    marginBottom: 12,
  },

  activeBadge: {
    background: "#dcfce7",

    color: "#166534",

    padding: "8px 14px",

    borderRadius: 30,

    display: "inline-block",

    fontWeight: 700,
  },

  statsGrid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",

    gap: 20,

    marginBottom: 30,
  },

  statCard: {
    background: "#fff",

    padding:
      "clamp(20px,4vw,28px)",

    borderRadius: 22,

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.05)",
  },

  statTitle: {
    color: "#64748b",

    marginBottom: 12,

    lineHeight: 1.6,
  },

  statValue: {
    fontSize:
      "clamp(26px,5vw,38px)",

    color: "#111827",

    margin: 0,

    wordBreak: "break-word",
  },

  section: {
    marginBottom: 40,
  },

  sectionTop: {
    marginBottom: 20,
  },

  sectionMini: {
    color: "#2563eb",

    fontWeight: 700,

    fontSize: 13,

    letterSpacing: 1,
  },

  sectionTitle: {
    fontSize:
      "clamp(24px,5vw,34px)",

    marginTop: 6,

    color: "#111827",
  },

  actionGrid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(240px,1fr))",

    gap: 20,
  },

  actionCard: {
    background: "#fff",

    padding:
      "clamp(20px,4vw,30px)",

    borderRadius: 24,

    textDecoration: "none",

    color: "#111827",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.05)",

    transition:
      "all 0.2s ease",

    minHeight: 220,

    display: "flex",

    flexDirection: "column",

    justifyContent: "flex-start",

    overflow: "hidden",
  },

  actionIcon: {
    fontSize: 38,

    marginBottom: 18,
  },

  lessonList: {
    display: "grid",

    gap: 18,
  },

  lessonCard: {
    background: "#fff",

    padding:
      "clamp(18px,4vw,26px)",

    borderRadius: 22,

    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",

    flexWrap: "wrap",

    gap: 16,

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.05)",

    overflow: "hidden",
  },

  lessonSubject: {
    marginBottom: 6,
    color: "#64748b",

    fontSize:
      "clamp(18px,4vw,24px)",
  },

  lessonTopic: {
    color: "#64748b",

    lineHeight: 1.6,
  },

  viewBtn: {
    background: "#2563eb",

    color: "#fff",

    padding: "10px 18px",

    borderRadius: 12,

    textDecoration: "none",

    fontWeight: 700,

    whiteSpace: "nowrap",
  },

  emptyBox: {
    background: "#fff",

    padding: 40,

    borderRadius: 24,

    textAlign: "center",

    color: "#64748b",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.05)",
  },
};