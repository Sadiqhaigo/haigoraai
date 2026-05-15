"use client";

import jsPDF from "jspdf";

export default function ExportPDFButton({
  topic,
  subject,
  level,
  content,
}: {
  topic: string;
  subject: string;
  level: string;
  content: string;
}) {
  const handleExport = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(topic, 10, 20);

    doc.setFontSize(12);
    doc.text(`Subject: ${subject}`, 10, 35);
    doc.text(`Level: ${level}`, 10, 45);

    const splitText = doc.splitTextToSize(content, 180);
    doc.text(splitText, 10, 60);

    doc.save(`${topic}.pdf`);
  };

  return (
    <button
    onClick={() =>
      exportPDF(
        lesson.topic,
        lesson.content
      )
    }
      className="bg-green-600 text-white px-4 py-2 rounded-lg"
    >
      Export as PDF
    </button>
  );
}