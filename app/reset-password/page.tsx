"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {

  const searchParams =
    useSearchParams();

  const token =
    searchParams.get("token");

  const router = useRouter();

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      setMessage("");

      const res =
        await fetch(
          "/api/reset-password",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              token,
              password,
            }),
          }
        );

      const data =
        await res.json();

        setMessage(data.message);

        if (res.ok) {
        
          setTimeout(() => {
        
            router.push("/login");
        
          }, 2000);
        }

    } catch {
      setMessage(
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>
          Reset Password
        </h1>

        <p style={styles.subtitle}>
          Enter your new password.
        </p>

        {message && (
          <div style={styles.message}>
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
        >
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            required
            style={styles.input}
          />

          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading
              ? "Resetting..."
              : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles: any = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f8fafc",
    padding: 20,
  },

  card: {
    width: "100%",
    maxWidth: 420,
    background: "#fff",
    padding: 32,
    borderRadius: 24,
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.05)",
  },

  title: {
    fontSize: 32,
    marginBottom: 10,
  },

  subtitle: {
    color: "#64748b",
    lineHeight: 1.7,
    marginBottom: 24,
  },

  input: {
    width: "100%",
    padding: 16,
    borderRadius: 14,
    border:
      "1px solid #d1d5db",
    marginBottom: 20,
    fontSize: 16,
  },

  button: {
    width: "100%",
    background: "#2563eb",
    color: "#fff",
    padding: 16,
    border: "none",
    borderRadius: 14,
    fontWeight: 700,
    cursor: "pointer",
  },

  message: {
    background: "#eff6ff",
    color: "#1d4ed8",
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
  },
};