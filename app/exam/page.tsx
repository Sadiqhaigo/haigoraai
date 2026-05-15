import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import AppLayout from "@/components/AppLayout";
import ExamForm from "@/components/ExamForm";

export default async function ExamPage() {
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
            AI Examination Generator
          </p>

          <h1 style={styles.title}>
            Generate Exams Questions
          </h1>

          <p style={styles.subtitle}>
            Create curriculum-aligned exams Questions
            instantly with HaigoraAI.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section style={styles.card}>
        <ExamForm />
      </section>
    </AppLayout>
  );
}

const styles: any = {
  hero: {
    background:
      "linear-gradient(135deg,#dc2626,#7f1d1d)",
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