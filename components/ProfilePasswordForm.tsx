"use client";

import { useState } from "react";

export default function ProfilePasswordForm() {
  const [showForm, setShowForm] =
    useState(false);

  const [
    currentPassword,
    setCurrentPassword,
  ] = useState("");

  const [
    newPassword,
    setNewPassword,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const handlePasswordChange =
    async () => {
      try {
        setLoading(true);

        setMessage("");

        const res =
          await fetch(
            "/api/change-password",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                currentPassword,
                newPassword,
              }),
            }
          );

        const data =
          await res.json();

        setMessage(
          data.message
        );

        if (res.ok) {
          setCurrentPassword(
            ""
          );

          setNewPassword("");

          setTimeout(() => {
            setShowForm(false);
          }, 1500);
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
    <div style={styles.card}>
      <h2 style={styles.title}>
        Security Settings
      </h2>

      <p style={styles.text}>
        Protect your account
        with a secure password.
      </p>

      {!showForm ? (
        <button
          onClick={() =>
            setShowForm(true)
          }
          style={styles.button}
        >
          Change Password
        </button>
      ) : (
        <>
          {message && (
            <div
              style={
                styles.message
              }
            >
              {message}
            </div>
          )}

          <div style={styles.group}>
            <label
              style={
                styles.label
              }
            >
              Current Password
            </label>

            <input
              type="password"
              value={
                currentPassword
              }
              onChange={(e) =>
                setCurrentPassword(
                  e.target.value
                )
              }
              style={styles.input}
              placeholder="Enter current password"
            />
          </div>

          <div style={styles.group}>
            <label
              style={
                styles.label
              }
            >
              New Password
            </label>

            <input
              type="password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }
              style={styles.input}
              placeholder="Enter new password"
            />
          </div>

          <div style={styles.actions}>
            <button
              onClick={
                handlePasswordChange
              }
              disabled={loading}
              style={
                styles.button
              }
            >
              {loading
                ? "Updating..."
                : "Update Password"}
            </button>

            <button
              onClick={() =>
                setShowForm(false)
              }
              style={
                styles.cancelButton
              }
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const styles: any = {
  card: {
    background: "#fff",

    borderRadius: 24,

    padding: 28,

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.05)",
  },

  title: {
    fontSize: 24,

    marginBottom: 12,

    color: "#111827",
  },

  text: {
    color: "#64748b",

    marginBottom: 24,

    lineHeight: 1.7,
  },

  message: {
    background: "#eff6ff",

    color: "#2563eb",

    padding: 14,

    borderRadius: 12,

    marginBottom: 20,

    lineHeight: 1.6,
  },

  group: {
    marginBottom: 18,
  },

  label: {
    display: "block",

    marginBottom: 8,

    fontWeight: 700,

    color: "#374151",
  },

  input: {
    width: "100%",

    padding: "16px 18px",

    borderRadius: 14,

    border:
      "1px solid #d1d5db",

    fontSize: 16,

    boxSizing:
      "border-box",

    outline: "none",
  },

  actions: {
    display: "flex",

    gap: 12,

    flexWrap: "wrap",

    marginTop: 10,
  },

  button: {
    background: "#e5e7eb",

    color: "#000",

    border: "20px",

    padding: "14px 18px",

    borderRadius: 14,

    fontWeight: 700,

    cursor: "pointer",
  },

  cancelButton: {
    background: "#e5e7eb",

    color: "#374151",

    border: "none",

    padding: "14px 18px",

    borderRadius: 14,

    fontWeight: 700,

    cursor: "pointer",
  },
};