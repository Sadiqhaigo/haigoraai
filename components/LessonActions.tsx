"use client";

import Link from "next/link";

import {
  useState,
} from "react";

import { useRouter }
from "next/navigation";

import { exportPDF }
from "@/lib/exportPDF";

import { exportAcademicDoc }
from "@/lib/exportAcademicDoc";

import { deleteLesson }
from "@/app/actions/deletelesson";

type Props = {
  id: string;
  title: string;
  content: string;
};

export default function LessonActions({
  id,
  title,
  content,
}: Props) {
  const router = useRouter();

  const [deleting, setDeleting] =
    useState(false);

    const handleDelete =
  async (id: string) => {
    const confirmed =
      confirm(
        "Are you sure you want to delete this item?"
      );

    if (!confirmed) return;

    try {
      const res =
        await fetch(
          "/api/delete-lesson",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              id,
            }),
          }
        );

      const data =
        await res.json();

      if (!res.ok) {
        throw new Error(
          data.error
        );
      }

      router.push("/history");
    } catch (error) {
      alert(
        "Failed to delete item."
      );
    }
  };

  return (
    <div
        className="lesson-actions"
        style={styles.wrapper}
      >
      {/* PDF */}
      <button
        style={styles.primaryBtn}
        onClick={() =>
          exportPDF(title, content)
        }
      >
        📄 PDF
      </button>

      {/* WORD */}
      <button
        style={styles.primaryBtn}
        onClick={() =>
          exportAcademicDoc(
            title,
            content
          )
        }
      >
        📝 WORD
      </button>

      {/* EDIT */}
      <Link
        href={`/history/${id}/edit`}
        style={styles.editBtn}
      >
        ✏ EDIT
      </Link>

      {/* DELETE */}
      <button
        style={{
          ...styles.deleteBtn,

          opacity:
            deleting ? 0.7 : 1,

          cursor:
            deleting
              ? "not-allowed"
              : "pointer",
        }}
        onClick={() =>
          handleDelete(id)
        }
        disabled={deleting}
      >
        {deleting
          ? "Deleting..."
          : "🗑 DELETE"}
      </button>
    </div>
  );
}

const styles: any = {
  wrapper: {
    display: "flex",
  
    gap: 12,
  
    flexWrap: "wrap",
  
    position: "sticky",
  
    top: 20,
  
    zIndex: 200,
  
    background:
      "rgba(248,250,252,0.96)",
  
    backdropFilter:
      "blur(12px)",
  
    padding: "10px 18px",
  
    marginBottom: 20,
  
    borderBottom:
      "1px solid rgba(0,0,0,0.06)",
  },

  primaryBtn: {
    border: "none",

    background:
      "linear-gradient(135deg,#2563eb,#1d4ed8)",

    color: "#fff",

    padding: "12px 18px",

    borderRadius: 12,

    cursor: "pointer",

    fontWeight: 700,

    fontSize: 14,
  },

  editBtn: {
    background:
      "linear-gradient(135deg,#0f172a,#1e293b)",

    color: "#fff",

    padding: "12px 18px",

    borderRadius: 12,

    textDecoration: "none",

    fontWeight: 700,

    fontSize: 14,
  },

  deleteBtn: {
    border: "none",

    background:
      "linear-gradient(135deg,#dc2626,#b91c1c)",

    color: "#fff",

    padding: "12px 18px",

    borderRadius: 12,

    fontWeight: 700,

    fontSize: 14,
  },
};