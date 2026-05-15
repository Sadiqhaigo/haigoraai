import { prisma }
from "@/lib/prisma";

import { redirect }
from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPage({
  params,
}: Props) {
  // NEXT.JS 15 FIX
  const { id } =
    await params;

  const lesson =
    await prisma.lesson.findUnique({
      where: {
        id,
      },
    });

  if (!lesson) {
    return (
      <div
        style={{
          padding: 40,
        }}
      >
        Lesson not found.
      </div>
    );
  }

  async function updateLesson(
    formData: FormData
  ) {
    "use server";

    const content =
      formData.get(
        "content"
      ) as string;

    await prisma.lesson.update({
      where: {
        id,
      },

      data: {
        content,
      },
    });

    redirect(
      `/history/${id}`
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>
          Edit Content
        </h1>

        <form
          action={updateLesson}
          style={styles.form}
        >
          <textarea
            name="content"
            defaultValue={
              lesson.content
            }
            style={styles.textarea}
          />

          <button
            type="submit"
            style={styles.button}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

const styles: any = {
  page: {
    minHeight: "100vh",

    background:
      "#f8fafc",

    padding: 40,
  },

  card: {
    maxWidth: 1000,

    margin: "0 auto",

    background: "#fff",

    padding: 30,

    borderRadius: 24,

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.05)",
  },

  title: {
    fontSize: 32,

    marginBottom: 24,

    color: "#0f172a",
  },

  form: {
    display: "grid",

    gap: 20,
  },

  textarea: {
    width: "100%",

    minHeight: 500,

    padding: 20,

    borderRadius: 18,

    border:
      "1px solid #cbd5e1",

    fontSize: 16,

    lineHeight: 1.8,

    outline: "none",
  },

  button: {
    border: "none",

    background:
      "linear-gradient(135deg,#2563eb,#1d4ed8)",

    color: "#fff",

    padding: "14px 22px",

    borderRadius: 14,

    cursor: "pointer",

    fontWeight: 700,

    fontSize: 16,
  },
};