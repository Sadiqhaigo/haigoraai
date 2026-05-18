import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import AppLayout from "@/components/AppLayout";
import TestForm from "@/components/TestForm";

export default async function TestPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <AppLayout>
      {/* HERO */}
      <section style={styles.hero}>
        <div>
          <p style={styles.badge}>
            AI Test Generator
          </p>

          <h1 style={styles.title}>
            Generate Smart Academic Tests
          </h1>

          <p style={styles.subtitle}>
            Create quizzes, assessments and
            classroom tests instantly using
            HaigoraAI.
          </p>
        </div>
      </section>

      {/* FORM CARD */}
      <section style={styles.card}>
        <TestForm />
      </section>
    </AppLayout>
  );
}

const styles: any = {
  hero: {
    background:
      "linear-gradient(135deg,#059669,#065f46)",
    borderRadius: 28,
    padding: 30,
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
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 18,
    opacity: 0.92,
    lineHeight: 1.7,
    maxWidth: 700,
  },

  card: {
    background: "#fff",
  
    borderRadius: 24,
  
    padding: 24,
  
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.05)",
  
    border:
      "1px solid #f1f5f9",
  },
};