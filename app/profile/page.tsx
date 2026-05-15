import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import ProfilePasswordForm from "@/components/ProfilePasswordForm";
import ProfileAppearance from "@/components/ProfileAppearance";


export default async function ProfilePage() {
  const session =
    await getAuthSession();

  const user =
    await prisma.user.findUnique({
      where: {
        email:
          session?.user?.email || "",
      },

      include: {
        lessons: true,
      },
    });

  const totalLessons =
    user?.lessons.filter(
      (l) =>
        l.contentType ===
        "lesson"
    ).length || 0;

  const totalAssignments =
    user?.lessons.filter(
      (l) =>
        l.contentType ===
        "assignment"
    ).length || 0;

  const totalTests =
    user?.lessons.filter(
      (l) =>
        l.contentType ===
        "test"
    ).length || 0;

  const totalExams =
    user?.lessons.filter(
      (l) =>
        l.contentType ===
        "exam"
    ).length || 0;

  return (
    <DashboardLayout
      role={user?.role}
    >
      {/* HERO */}
      <div style={styles.hero}>
        <div style={styles.avatar}>
          {user?.name?.charAt(0)}
        </div>

        <div>
          <h1 style={styles.name}>
            {user?.name}
          </h1>

          <p style={styles.role}>
            {user?.role} •{" "}
            {user?.state}
          </p>

          <p style={styles.email}>
            {user?.email}
          </p>
        </div>
      </div>

      {/* GRID */}
      <div style={styles.grid}>
        {/* ACCOUNT INFO */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            Account Information
          </h2>

          <div style={styles.infoGroup}>
            <label style={styles.label}>
              Full Name
            </label>

            <div style={styles.value}>
              {user?.name}
            </div>
          </div>

          <div style={styles.infoGroup}>
            <label style={styles.label}>
              Email Address
            </label>

            <div style={styles.value}>
              {user?.email}
            </div>
          </div>

          <div style={styles.infoGroup}>
            <label style={styles.label}>
              Role Type
            </label>

            <div style={styles.value}>
              {user?.role}
            </div>
          </div>

          <div style={styles.infoGroup}>
            <label style={styles.label}>
              State
            </label>

            <div style={styles.value}>
              {user?.state}
            </div>
          </div>
        </div>

        {/* STATS */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            Usage Statistics
          </h2>

          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <h3
                style={
                  styles.statNumber
                }
              >
                {totalLessons}
              </h3>

              <p
                style={
                  styles.statLabel
                }
              >
                Lessons
              </p>
            </div>

            <div style={styles.statCard}>
              <h3
                style={
                  styles.statNumber
                }
              >
                {
                  totalAssignments
                }
              </h3>

              <p
                style={
                  styles.statLabel
                }
              >
                Assignments
              </p>
            </div>

            <div style={styles.statCard}>
              <h3
                style={
                  styles.statNumber
                }
              >
                {totalTests}
              </h3>

              <p
                style={
                  styles.statLabel
                }
              >
                Tests
              </p>
            </div>

            <div style={styles.statCard}>
              <h3
                style={
                  styles.statNumber
                }
              >
                {totalExams}
              </h3>

              <p
                style={
                  styles.statLabel
                }
              >
                Exams
              </p>
            </div>
          </div>
        </div>

        {/* SECURITY */}
        <ProfilePasswordForm />

        {/* APPEARANCE */}
        <ProfileAppearance />

        {/* ACTIVITY */}
        <div style={styles.cardWide}>
          <h2 style={styles.cardTitle}>
            Recent Activity
          </h2>

          <div
            style={
              styles.activityList
            }
          >
            {user?.lessons
              ?.slice(0, 5)
              .map((lesson) => (
                <div
                  key={lesson.id}
                  style={
                    styles.activityItem
                  }
                >
                  <div>
                    <h3
                      style={
                        styles.activityTitle
                      }
                    >
                      {
                        lesson.topic
                      }
                    </h3>

                    <p
                      style={
                        styles.activityMeta
                      }
                    >
                      {
                        lesson.subject
                      }{" "}
                      •{" "}
                      {
                        lesson.contentType
                      }
                    </p>
                  </div>

                  <Link
                    href={`/history/${lesson.id}`}
                    style={
                      styles.viewBtn
                    }
                  >
                    View
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

const styles: any = {
  hero: {
    background:
      "linear-gradient(135deg,#0f172a,#1e293b)",

    borderRadius: 32,

    padding:
      "clamp(24px,5vw,40px)",

    display: "flex",

    alignItems: "center",

    gap: 24,

    marginBottom: 30,

    color: "#fff",

    flexWrap: "wrap",
  },

  avatar: {
    width:
      "clamp(80px,10vw,100px)",

    height:
      "clamp(80px,10vw,100px)",

    borderRadius: "50%",

    background:
      "linear-gradient(135deg,#2563eb,#3b82f6)",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    fontSize:
      "clamp(30px,5vw,42px)",

    fontWeight: 800,
  },

  name: {
    fontSize:
      "clamp(28px,6vw,38px)",

    fontWeight: 800,

    marginBottom: 8,
  },

  role: {
    opacity: 0.9,

    fontSize: 16,

    marginBottom: 6,
  },

  email: {
    opacity: 0.75,

    wordBreak: "break-word",
  },

  grid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(300px,1fr))",

    gap: 24,
  },

  card: {
    background: "#fff",

    borderRadius: 24,

    padding:
      "clamp(20px,4vw,28px)",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.05)",

    border:
      "1px solid #f1f5f9",
  },

  cardWide: {
    gridColumn: "1/-1",

    background: "#fff",

    borderRadius: 28,

    padding:
      "clamp(20px,4vw,30px)",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.05)",
  },

  cardTitle: {
    fontSize: 22,

    marginBottom: 24,

    color: "#0f172a",
  },

  infoGroup: {
    marginBottom: 20,
  },

  label: {
    display: "block",

    fontSize: 13,

    fontWeight: 700,

    color: "#64748b",

    marginBottom: 8,

    textTransform:
      "uppercase",
  },

  value: {
    background: "#f8fafc",
    color: "#000",

    padding: 14,

    borderRadius: 14,
  },

  statsGrid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(120px,1fr))",

    gap: 16,
  },

  statCard: {
    background:
      "linear-gradient(135deg,#eff6ff,#dbeafe)",

    borderRadius: 20,

    padding: 20,

    textAlign: "center",
  },

  statNumber: {
    fontSize: 34,

    fontWeight: 800,

    color: "#2563eb",

    marginBottom: 8,
  },

  statLabel: {
    color: "#475569",

    fontWeight: 600,
  },

  securityBox: {
    background: "#f8fafc",

    padding: 20,

    borderRadius: 18,
  },

  securityTitle: {
    fontSize: 18,

    fontWeight: 700,

    marginBottom: 10,
    color: "#64748b",
  },

  securityText: {
    color: "#64748b",

    lineHeight: 1.8,

    marginBottom: 20,
  },

  primaryButton: {
    width: "100%",

    background: "#2563eb",

    color: "#fff",

    padding: 16,

    borderRadius: 14,

    border: "none",

    fontWeight: 700,

    cursor: "pointer",
  },

  disabledButton: {
    width: "100%",

    background: "#e2e8f0",

    color: "#64748b",

    padding: 16,

    borderRadius: 14,

    border: "none",

    fontWeight: 700,
  },

  activityList: {
    display: "grid",

    gap: 18,
  },

  activityItem: {
    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",

    flexWrap: "wrap",

    gap: 16,

    padding: 20,

    background: "#f8fafc",

    borderRadius: 18,
  },

  activityTitle: {
    fontSize: 20,
    color: "#000",

    marginBottom: 6,
  },

  activityMeta: {
    color: "#64748b",
  },

  viewBtn: {
    background: "#2563eb",

    color: "#fff",

    padding: "10px 18px",

    borderRadius: 12,

    textDecoration: "none",

    fontWeight: 700,
  },

  inputGroup: {
    display: "grid",

    gap: 8,

    marginBottom: 18,
  },

  input: {
    width: "100%",

    padding: "16px 18px",

    borderRadius: 14,

    border:
      "1px solid #d1d5db",

    fontSize: 16,

    background: "#fff",

    color: "#111827",

    boxSizing:
      "border-box",

    outline: "none",
  },

  message: {
    background: "#eff6ff",

    color: "#1d4ed8",

    padding: 14,

    borderRadius: 12,

    marginBottom: 20,

    lineHeight: 1.6,
  },
};