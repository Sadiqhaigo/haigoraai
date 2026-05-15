type Props = {
    content: string;
    subject?: string;
    level?: string;
    curriculum?: string;
  };
  
  export default function FormattedContent({
    content,
  }: Props) {
    const sections = content
      .split("\n")
      .filter((line) => line.trim() !== "");
  
    const isHeading = (line: string) => {
      const headings = [
        "LEARNING OBJECTIVES",
        "INTRODUCTION",
        "PRESENTATION",
        "EXAMPLES",
        "EVALUATION",
        "CONCLUSION",
        "ASSIGNMENT",
        "INSTRUCTIONS",
        "SECTION A",
        "SECTION B",
        "MARKING SCHEME",
        "SUMMARY",
      ];
  
      return headings.includes(
        line.trim().toUpperCase()
      );
    };
  
    return (
      <div style={styles.wrapper}>
        {sections.map((line, index) => {
          // HEADINGS
          if (isHeading(line)) {
            return (
              <h2
                key={index}
                style={styles.heading}
              >
                {line}
              </h2>
            );
          }
  
          // NUMBER LISTS
          if (
            /^\d+\./.test(
              line.trim()
            )
          ) {
            return (
              <p
                key={index}
                style={styles.list}
              >
                {line}
              </p>
            );
          }
  
          // BULLETS
          if (
            line
              .trim()
              .startsWith("-")
          ) {
            return (
              <p
                key={index}
                style={styles.bullet}
              >
                •{" "}
                {line.replace("-", "")}
              </p>
            );
          }
  
          // NORMAL PARAGRAPH
          return (
            <p
              key={index}
              style={styles.paragraph}
            >
              {line}
            </p>
          );
        })}
      </div>
    );
  }
  
  const styles: any = {
    wrapper: {
      display: "grid",
  
      gap: 14,
  
      paddingTop: 10,
    },
  
    heading: {
      marginTop: 28,
  
      marginBottom: 8,
  
      fontSize: 24,
  
      fontWeight: 700,
  
      color: "#0f172a",
  
      lineHeight: 1.4,
    },
  
    paragraph: {
      margin: 0,
  
      fontSize: 16,
  
      lineHeight: 1.95,
  
      color: "#334155",
  
      whiteSpace: "pre-wrap",
    },
  
    list: {
      margin: 0,
  
      fontSize: 16,
  
      lineHeight: 1.9,
  
      color: "#1e293b",
  
      whiteSpace: "pre-wrap",
    },
  
    bullet: {
      margin: 0,
  
      paddingLeft: 8,
  
      fontSize: 16,
  
      lineHeight: 1.9,
  
      color: "#475569",
  
      whiteSpace: "pre-wrap",
    },
  };