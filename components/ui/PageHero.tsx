type Props = {
  title: string;

  subtitle?: string;
};

export default function PageHero({
  title,

  subtitle,
}: Props) {
  return (
    <div style={styles.hero}>
      <h1 style={styles.title}>
        {title}
      </h1>

      {subtitle && (
        <p
          style={
            styles.subtitle
          }
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

const styles: any = {
  hero: {
    background:
      "linear-gradient(135deg,#0f172a,#1e293b)",

    borderRadius: 30,

    padding: 32,

    color: "#fff",

    marginBottom: 30,
  },

  title: {
    fontSize:
      "clamp(28px,5vw,36px)",

    fontWeight: 800,

    marginBottom: 10,
  },

  subtitle: {
    opacity: 0.8,

    lineHeight: 1.7,

    maxWidth: 700,
  },
};