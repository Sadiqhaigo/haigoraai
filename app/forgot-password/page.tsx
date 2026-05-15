"use client";

import { useState } from "react";

import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit =
    async () => {
      try {
        setLoading(true);

        setMessage("");

        const res =
          await fetch(
            "/api/forgot-password",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                email,
              }),
            }
          );

        const data =
          await res.json();

        setMessage(
          data.message
        );
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
          Forgot Password
        </h1>

        <p style={styles.subtitle}>
          Enter your email address
          to reset your password.
        </p>

        {message && (
          <div style={styles.message}>
            {message}
          </div>
        )}

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          style={styles.input}
        />

        <button
          onClick={
            handleSubmit
          }
          disabled={loading}
          style={styles.button}
        >
          {loading
            ? "Sending..."
            : "Reset Password"}
        </button>

        <Link
          href="/login"
          style={styles.link}
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}

const styles: any = {
  page: {
    minHeight: "100vh",

    display: "flex",

    alignItems: "center",

    justifyContent:
      "center",

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

  link: {
    display: "block",

    marginTop: 20,

    textAlign: "center",

    color: "#2563eb",

    textDecoration: "none",

    fontWeight: 700,
  },
};