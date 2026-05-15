import { redirect } from "next/navigation";

import Link from "next/link";

import { prisma } from "@/lib/prisma";

import { getAuthSession } from "@/lib/auth";

import DashboardLayout from "@/components/DashboardLayout";

import AppCard from "@/components/ui/AppCard";

import AppButton from "@/components/ui/AppButton";

import PageHero from "@/components/ui/PageHero";

import UserActions from "@/components/admin/UserActions";

export default async function AdminPage() {
  const session =
    await getAuthSession();

  const currentUser =
    await prisma.user.findUnique({
      where: {
        email:
          session?.user?.email || "",
      },
    });

  // ADMIN PROTECTION
  if (
    currentUser?.role !==
    "admin"
  ) {
    redirect("/dashboard");
  }

  // USERS
  const users =
    await prisma.user.findMany({
      include: {
        lessons: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  // CONTENT
  const contents =
    await prisma.lesson.findMany({
      include: {
        user: true,
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 10,
    });

  // STATS
  const totalUsers =
    users.length;

  const totalLessons =
    await prisma.lesson.count({
      where: {
        contentType:
          "lesson",
      },
    });

  const totalAssignments =
    await prisma.lesson.count({
      where: {
        contentType:
          "assignment",
      },
    });

  const totalTests =
    await prisma.lesson.count({
      where: {
        contentType: "test",
      },
    });

  const totalExams =
    await prisma.lesson.count({
      where: {
        contentType: "exam",
      },
    });

  return (
    <DashboardLayout
      role={currentUser?.role}
    >
      <div style={styles.container}>
        {/* HERO */}
        <PageHero
          title="Ultra Admin Panel"
          subtitle="Manage users, educational content, analytics, platform operations and institutional activities."
        />

        {/* STATS */}
        <div
          style={
            styles.statsGrid
          }
        >
          <AppCard>
            <div
              style={
                styles.statContent
              }
            >
              <h2
                style={
                  styles.statNumber
                }
              >
                {totalUsers}
              </h2>

              <p
                style={
                  styles.statLabel
                }
              >
                Total Users
              </p>
            </div>
          </AppCard>

          <AppCard>
            <div
              style={
                styles.statContent
              }
            >
              <h2
                style={
                  styles.statNumber
                }
              >
                {totalLessons}
              </h2>

              <p
                style={
                  styles.statLabel
                }
              >
                Lessons
              </p>
            </div>
          </AppCard>

          <AppCard>
            <div
              style={
                styles.statContent
              }
            >
              <h2
                style={
                  styles.statNumber
                }
              >
                {
                  totalAssignments
                }
              </h2>

              <p
                style={
                  styles.statLabel
                }
              >
                Assignments
              </p>
            </div>
          </AppCard>

          <AppCard>
            <div
              style={
                styles.statContent
              }
            >
              <h2
                style={
                  styles.statNumber
                }
              >
                {totalTests}
              </h2>

              <p
                style={
                  styles.statLabel
                }
              >
                Tests
              </p>
            </div>
          </AppCard>

          <AppCard>
            <div
              style={
                styles.statContent
              }
            >
              <h2
                style={
                  styles.statNumber
                }
              >
                {totalExams}
              </h2>

              <p
                style={
                  styles.statLabel
                }
              >
                Exams
              </p>
            </div>
          </AppCard>
        </div>

        {/* USER MANAGEMENT */}
        <AppCard>
          <div
            style={
              styles.cardHeader
            }
          >
            <h2
              style={
                styles.cardTitle
              }
            >
              User Management
            </h2>
          </div>

          <div
            style={
              styles.tableWrap
            }
          >
            <table
              style={styles.table}
            >
              <thead>
                <tr>
                  <th
                    style={
                      styles.th
                    }
                  >
                    Name
                  </th>

                  <th
                    style={
                      styles.th
                    }
                  >
                    Email
                  </th>

                  <th
                    style={
                      styles.th
                    }
                  >
                    Role
                  </th>

                  <th
                    style={
                      styles.th
                    }
                  >
                    Contents
                  </th>

                  <th
                    style={
                      styles.th
                    }
                  >
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map(
                  (user) => (
                    <tr
                      key={user.id}
                    >
                      <td
                        style={
                          styles.td
                        }
                      >
                        {user.name}
                      </td>

                      <td
                        style={
                          styles.td
                        }
                      >
                        {user.email}
                      </td>

                      <td
                        style={
                          styles.td
                        }
                      >
                        <span
                          style={{
                            ...styles.roleBadge,

                            background:
                              user.role ===
                              "admin"
                                ? "#dc2626"
                                : "#2563eb",
                          }}
                        >
                          {
                            user.role
                          }
                        </span>
                      </td>

                      <td
                        style={
                          styles.td
                        }
                      >
                        {
                          user
                            .lessons
                            .length
                        }
                      </td>

                      <td
                        style={
                          styles.td
                        }
                      >
                        <UserActions
                          userId={user.id}
                          userName={user.name || "User"}
                          currentUserId={currentUser?.id || ""}
                        />

                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </AppCard>

        {/* RECENT CONTENT */}
        <AppCard
          style={{
            marginTop: 30,
          }}
        >
          <div
            style={
              styles.cardHeader
            }
          >
            <h2
              style={
                styles.cardTitle
              }
            >
              Recent Generated
              Content
            </h2>
          </div>

          <div
            style={
              styles.contentList
            }
          >
            {contents.map(
              (item) => (
                <div
                  key={item.id}
                  style={
                    styles.contentItem
                  }
                >
                  <div
                    style={
                      styles.contentInfo
                    }
                  >
                    <h3
                      style={
                        styles.contentTitle
                      }
                    >
                      {item.topic}
                    </h3>

                    <p
                      style={
                        styles.contentMeta
                      }
                    >
                      {
                        item.subject
                      }{" "}
                      •{" "}
                      {
                        item.contentType
                      }{" "}
                      • by{" "}
                      {
                        item.user
                          ?.name
                      }
                    </p>
                  </div>

                  <div
                    style={
                      styles.actionRow
                    }
                  >
                    <Link
                      href={`/history/${item.id}`}
                    >
                      <AppButton>
                        Open
                      </AppButton>
                    </Link>

                    <form
                      action={`/api/delete-lesson?id=${item.id}`}
                      method="POST"
                    >
                      <AppButton variant="danger">
                        Delete
                      </AppButton>
                    </form>
                  </div>
                </div>
              )
            )}
          </div>
        </AppCard>
      </div>
    </DashboardLayout>
  );
}

const styles: any = {
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 16px",

    // maxWidth: 1300,

    // margin: "0 auto",
  },

  statsGrid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(180px,1fr))",

    gap: 16,

    marginBottom: 30,
  },

  statContent: {
    display: "flex",

    flexDirection:
      "column",

    gap: 8,
  },

  statNumber: {
    fontSize: 34,

    fontWeight: 800,

    color: "#2563eb",
  },

  statLabel: {
    color: "#64748b",

    fontWeight: 600,
  },

  cardHeader: {
    marginBottom: 24,
  },

  cardTitle: {
    fontSize: 24,

    fontWeight: 700,

    color: "#0f172a",
  },

  tableWrap: {
    width: "100%",

    overflowX: "auto",

    WebkitOverflowScrolling:
      "touch",
  },

  table: {
    width: "100%",

    minWidth: 700,

    borderCollapse:
      "collapse",
  },

  th: {
    textAlign: "left",

    padding: 16,

    background: "#f8fafc",

    color: "#334155",

    fontWeight: 700,

    fontSize: 14,
  },

  td: {
    padding: 16,

    borderBottom:
      "1px solid #e2e8f0",

    color: "#334155",

    fontSize: 14,
  },

  roleBadge: {
    color: "white",

    padding: "6px 12px",

    borderRadius: 999,

    fontSize: 12,

    fontWeight: 700,

    display: "inline-flex",
  },

  actionRow: {
    display: "flex",

    gap: 10,

    flexWrap: "wrap",

    alignItems: "center",
  },

  contentList: {
    display: "grid",

    gap: 18,
  },

  contentItem: {
    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "flex-start",

    gap: 20,

    flexWrap: "wrap",

    padding: 20,

    borderRadius: 20,

    background: "#f8fafc",

    border:
      "1px solid #e2e8f0",
  },

  contentInfo: {
    flex: 1,

    minWidth: 240,
  },

  contentTitle: {
    color: "#0f172a",

    marginBottom: 6,

    fontSize: 18,

    fontWeight: 700,
  },

  contentMeta: {
    color: "#64748b",

    lineHeight: 1.6,
  },
};