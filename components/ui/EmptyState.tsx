type Props = {
  title: string;

  subtitle?: string;
};

export default function EmptyState({
  title,
  subtitle,
}: Props) {
  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>
        {title}
      </h2>

      {subtitle && (
        <p style={styles.subtitle}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

const styles: any = {
  wrapper: {
    textAlign: "center",

    padding: "60px 20px",

    borderRadius: 24,

    background: "#fff",

    border:
      "1px solid #e2e8f0",
  },

  title: {
    fontSize: 24,

    fontWeight: 800,

    marginBottom: 12,
  },

  subtitle: {
    color: "#64748b",

    lineHeight: 1.7,
  },
};