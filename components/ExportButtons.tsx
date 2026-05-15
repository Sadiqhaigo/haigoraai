"use client";

export default function ExportButton({ content }: { content: string }) {
  const handleExport = () => {
    const blob = new Blob([content], {
      type: "application/msword",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lesson.doc";
    a.click();
  };

  return (
    <button onClick={() =>
      exportAcademicDoc(
        lesson.topic,
        lesson.content
      )
    } style={styles.btn}>
      Download Word
    </button>
  );
}

const styles: any = {
  btn: {
    background: "#2563eb", // blue (Word)
    color: "#fff",
    padding: "8px 14px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
  },
};