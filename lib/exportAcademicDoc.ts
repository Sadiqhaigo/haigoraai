import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
} from "docx";

import { saveAs } from "file-saver";

export async function exportAcademicDoc(
  title: string,
  content: string
) {
  const lines = content
    .split("\n")
    .filter((line) => line.trim() !== "");

  const paragraphs = lines.map(
    (line) => {
      // HEADINGS
      const isHeading =
        line === line.toUpperCase() &&
        line.length < 40;

      return new Paragraph({
        alignment: isHeading
          ? AlignmentType.CENTER
          : AlignmentType.JUSTIFIED,

        spacing: {
          line: 360,
        },

        heading: isHeading
          ? HeadingLevel.HEADING_1
          : undefined,

        children: [
          new TextRun({
            text: line,
            font: "Times New Roman",
            size: 24,
          }),
        ],
      });
    }
  );

  const doc = new Document({
    sections: [
      {
        properties: {},

        children: [
          new Paragraph({
            alignment:
              AlignmentType.CENTER,

            spacing: {
              after: 300,
            },

            children: [
              new TextRun({
                text: title,

                bold: true,

                size: 32,

                font:
                  "Times New Roman",
              }),
            ],
          }),

          ...paragraphs,
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);

  saveAs(blob, `${title}.docx`);
}