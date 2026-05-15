"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body
        style={{
          margin: 0,
          fontFamily:
            "Inter, sans-serif",
          background: "#f8fafc",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 520,
            background: "#fff",
            borderRadius: 28,
            padding: 40,
            textAlign: "center",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.08)",
            border:
              "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              fontSize: 56,
              marginBottom: 18,
            }}
          >
            ⚠️
          </div>

          <h1
            style={{
              fontSize: 30,
              marginBottom: 12,
              color: "#0f172a",
            }}
          >
            Something went wrong
          </h1>

          <p
            style={{
              color: "#475569",
              lineHeight: 1.7,
              marginBottom: 28,
            }}
          >
            HaigoraAI encountered an unexpected issue.
            Please try again.
          </p>

          <button
            onClick={() => reset()}
            style={{
              background:
                "linear-gradient(135deg,#2563eb,#1d4ed8)",
              color: "white",
              border: "none",
              padding: "14px 24px",
              borderRadius: 16,
              fontWeight: 700,
              cursor: "pointer",
              fontSize: 15,
            }}
          >
            Retry
          </button>
        </div>
      </body>
    </html>
  );
}