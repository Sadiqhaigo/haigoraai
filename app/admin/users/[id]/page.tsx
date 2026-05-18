import { prisma }
from "@/lib/prisma";

import { getServerSession }
from "next-auth";

import { authOptions }
from "@/lib/auth";

import { redirect }
from "next/navigation";

import AppLayout
from "@/components/AppLayout";

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } =
    await params;

  const session =
    await getServerSession(
      authOptions
    );

  if (!session?.user?.email) {
    redirect("/login");
  }

  const currentUser =
    await prisma.user.findUnique({
      where: {
        email:
          session.user.email,
      },
    });

  if (
    !currentUser ||
    currentUser.role !==
      "admin"
  ) {
    redirect("/dashboard");
  }

  const user =
    await prisma.user.findUnique({
      where: {
        id,
      },

      include: {
        lessons: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

  if (!user) {
    return (
      <AppLayout>
        <div style={styles.notFound}>
          User not found
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div style={styles.container}>
        {/* HEADER */}
        <div style={styles.hero}>
          <div>
            <p style={styles.badge}>
              User Details
            </p>

            <h1 style={styles.title}>
              {user.name ||
                "Unnamed User"}
            </h1>

            <p style={styles.subtitle}>
              Monitor educator
              activity and
              generated academic
              content.
            </p>
          </div>
        </div>

        {/* PROFILE CARD */}
        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>
            Account Information
          </h2>

          <div style={styles.grid}>
            <div>
              <p style={styles.label}>
                Name
              </p>

              <p style={styles.value}>
                {user.name ||
                  "N/A"}
              </p>
            </div>

            <div>
              <p style={styles.label}>
                Email
              </p>

              <p style={styles.value}>
                {user.email}
              </p>
            </div>

            <div>
              <p style={styles.label}>
                Role
              </p>

              <p style={styles.value}>
                {user.role}
              </p>
            </div>

            <div>
              <p style={styles.label}>
                Joined
              </p>

              <p style={styles.value}>
                {new Date(
                  user.createdAt
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
        </section>

        {/* CONTENT HISTORY */}
        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>
            Generated Contents
          </h2>

          {user.lessons.length ===
          0 ? (
            <p style={styles.empty}>
              No generated content
              yet.
            </p>
          ) : (
            <div
              style={
                styles.contentList
              }
            >
              {user.lessons.map(
                (lesson) => (
                  <div
                    key={
                      lesson.id
                    }
                    style={
                      styles.contentCard
                    }
                  >
                    <div>
                      <h3
                        style={
                          styles.contentTitle
                        }
                      >
                        {
                          lesson.topic
                        }
                      </h3>

                      <p
                        style={
                          styles.meta
                        }
                      >
                        {
                          lesson.subject
                        }{" "}
                        •{" "}
                        {
                          lesson.level
                        }
                      </p>

                      <p
                        style={
                          styles.meta
                        }
                      >
                        {
                          lesson.curriculum
                        }
                      </p>

                      <p
                        style={
                          styles.type
                        }
                      >
                        {
                          lesson.contentType
                        }
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </section>
      </div>
    </AppLayout>
  );
}

const styles: any = {
  container: {
    width: "100%",

    maxWidth: 1300,

    margin: "0 auto",

    padding:
      "clamp(12px,3vw,24px)",
  },

  hero: {
    background:
      "linear-gradient(135deg,#0f172a,#1e293b)",

    borderRadius: 28,

    padding:
      "clamp(24px,5vw,40px)",

    color: "#fff",

    marginBottom: 30,
  },

  badge: {
    display: "inline-block",

    background:
      "rgba(255,255,255,0.15)",

    padding: "8px 14px",

    borderRadius: 30,

    fontSize: 13,

    marginBottom: 18,
  },

  title: {
    fontSize:
      "clamp(30px,6vw,48px)",

    fontWeight: 800,

    marginBottom: 12,
  },

  subtitle: {
    fontSize: 18,

    opacity: 0.9,

    lineHeight: 1.7,
  },

  card: {
    background: "#fff",

    borderRadius: 24,

    padding: 24,

    marginBottom: 24,

    border:
      "1px solid #e2e8f0",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.04)",
  },

  sectionTitle: {
    fontSize: 22,
    color: "#000",

    fontWeight: 700,

    marginBottom: 24,
  },

  grid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",

    gap: 20,
  },

  label: {
    fontSize: 13,

    color: "#64748b",

    marginBottom: 8,
  },

  value: {
    fontWeight: 600,

    color: "#0f172a",
  },

  contentList: {
    display: "grid",

    gap: 18,
  },

  contentCard: {
    border:
      "1px solid #e2e8f0",

    borderRadius: 18,

    padding: 20,

    background: "#f8fafc",
  },

  contentTitle: {
    fontSize: 18,
    color: "#64748b",

    fontWeight: 700,

    marginBottom: 10,
  },

  meta: {
    color: "#475569",

    marginBottom: 6,
  },

  type: {
    display: "inline-block",

    marginTop: 10,

    background: "#dbeafe",

    color: "#1d4ed8",

    padding: "6px 12px",

    borderRadius: 30,

    fontSize: 13,

    fontWeight: 600,

    textTransform:
      "capitalize",
  },

  empty: {
    color: "#64748b",
  },

  notFound: {
    padding: 40,

    textAlign: "center",

    fontSize: 18,
  },
};