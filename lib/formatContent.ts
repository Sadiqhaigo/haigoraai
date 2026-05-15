export function formatContent(
  content: string
) {
  if (!content) return "";

  return (
    content

      // REMOVE MARKDOWN HEADINGS ONLY
      .replace(/^#{1,6}\s/gm, "")

      // REMOVE BOLD MARKDOWN ONLY
      .replace(/\*\*(.*?)\*\*/g, "$1")

      // REMOVE CODE BLOCKS
      .replace(/```/g, "")

      // REMOVE MARKDOWN SEPARATORS ONLY
      .replace(/^\s*---\s*$/gm, "")

      // CLEAN EXCESS SPACING
      .replace(/\n{3,}/g, "\n\n")

      // STANDARDIZE HEADINGS
      .replace(
        /Learning Objectives:/gi,
        "\n\nLEARNING OBJECTIVES\n"
      )

      .replace(
        /Introduction:/gi,
        "\n\nINTRODUCTION\n"
      )

      .replace(
        /Presentation:/gi,
        "\n\nPRESENTATION\n"
      )

      .replace(
        /Examples:/gi,
        "\n\nEXAMPLES\n"
      )

      .replace(
        /Evaluation:/gi,
        "\n\nEVALUATION\n"
      )

      .replace(
        /Conclusion:/gi,
        "\n\nCONCLUSION\n"
      )

      .replace(
        /Assignment:/gi,
        "\n\nASSIGNMENT\n"
      )

      .replace(
        /Instructions:/gi,
        "\n\nINSTRUCTIONS\n"
      )

      .replace(
        /Section A:/gi,
        "\n\nSECTION A\n"
      )

      .replace(
        /Section B:/gi,
        "\n\nSECTION B\n"
      )

      .replace(
        /Marking Scheme:/gi,
        "\n\nMARKING SCHEME\n"
      )

      .trim()
  );
}