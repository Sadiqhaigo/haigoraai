import Link from "next/link";
         
export default function NotFound() {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
          background: "#f8fafc",
        }}
      >
      <div
      style={{
        textAlign: "center",
        maxWidth: 520,
      }}
    >
        <div
          style={{
            fontSize: 72,
            marginBottom: 20,
          }}
        >
          🚀
        </div>

        <h1
          style={{
            fontSize: 40,
            marginBottom: 12,
          }}
        >
          Page Not Found
        </h1>

        <p
          style={{
            color: "#64748b",
            marginBottom: 28,
            lineHeight: 1.7,
          }}
        >
          The page you are looking for does not exist.
        </p>

        <Link href="/dashboard">
          <button
            style={{
              background:
                "linear-gradient(135deg,#2563eb,#1d4ed8)",
              color: "white",
              border: "none",
              padding: "14px 24px",
              borderRadius: 16,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}