import { getServerSession }
from "next-auth";

import { authOptions }
from "@/lib/auth";

import { redirect }
from "next/navigation";

import AppLayout
from "@/components/AppLayout";

import AssignmentForm
from "@/components/AssignmentForm";

export default async function AssignmentPage() {
  const session =
    await getServerSession(
      authOptions
    );

  if (!session) {
    redirect("/login");
  }

  return (
    <AppLayout>
      <div style={styles.container}>
        {/* HERO */}
        <section style={styles.hero}>
          <div>
            <p style={styles.badge}>
              AI Assignment Generator
            </p>

            <h1 style={styles.title}>
              Generate Smart
              Assignments
            </h1>

            <p style={styles.subtitle}>
              Create professional
              assignments and
              take-home tasks
              instantly using
              HaigoraAI.
            </p>
          </div>
        </section>

        {/* FORM */}
        <section
          style={styles.card}
        >
          <AssignmentForm />
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

    boxSizing:
      "border-box",
  },

  hero: {
    background:
      "linear-gradient(135deg,#7c3aed,#4f46e5)",

    borderRadius: 28,

    padding:
      "clamp(24px,5vw,40px)",

    color: "#fff",

    marginBottom: 30,

    overflow: "hidden",
  },

  badge: {
    display: "inline-block",

    background:
      "rgba(255,255,255,0.15)",

    padding: "8px 14px",

    borderRadius: 30,

    fontSize: 13,

    marginBottom: 18,

    fontWeight: 600,

    backdropFilter:
      "blur(10px)",
  },

  title: {
    fontSize:
      "clamp(30px,6vw,48px)",

    marginBottom: 14,

    lineHeight: 1.1,

    fontWeight: 800,
  },

  subtitle: {
    fontSize:
      "clamp(16px,2vw,19px)",

    opacity: 0.92,

    lineHeight: 1.8,

    maxWidth: 760,
  },

  card: {
    background: "#fff",

    borderRadius: 28,

    padding:
      "clamp(18px,4vw,28px)",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.05)",

    border:
      "1px solid #f1f5f9",

    overflow: "hidden",
  },
};