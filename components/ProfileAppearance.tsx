"use client";

import { useState } from "react";

export default function ProfileAppearance() {
  const [open, setOpen] =
    useState(false);

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>
        Appearance
      </h2>

      <p style={styles.text}>
        Customize your visual
        experience and future
        theme preferences.
      </p>

      {!open ? (
        <button
          onClick={() =>
            setOpen(true)
          }
          style={styles.button}
        >
          Appearance Settings
        </button>
      ) : (
        <>
          <div style={styles.option}>
            <div>
              <h3
                style={
                  styles.optionTitle
                }
              >
                Light Mode
              </h3>

              <p
                style={
                  styles.optionText
                }
              >
                Optimized for
                educator
                readability and
                professional
                content creation.
              </p>
            </div>

            <div style={styles.active}>
              Active
            </div>
          </div>

          <div style={styles.option}>
            <div>
              <h3
                style={
                  styles.optionTitle
                }
              >
                Dark Mode
              </h3>

              <p
                style={
                  styles.optionText
                }
              >
                Coming soon in a
                future update.
              </p>
            </div>

            <button
              style={
                styles.disabledButton
              }
            >
              Coming Soon
            </button>
          </div>

          <button
            onClick={() =>
              setOpen(false)
            }
            style={
              styles.cancelButton
            }
          >
            Close
          </button>
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

  option: {
    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",

    gap: 16,

    flexWrap: "wrap",

    padding: 20,

    background: "#f8fafc",

    borderRadius: 18,

    marginBottom: 18,
  },

  optionTitle: {
    fontSize: 18,

    marginBottom: 6,

    color: "#111827",
  },

  optionText: {
    color: "#64748b",

    lineHeight: 1.6,
  },

  active: {
    background: "#dcfce7",

    color: "#166534",

    padding: "10px 14px",

    borderRadius: 12,

    fontWeight: 700,
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

  disabledButton: {
    background: "#e5e7eb",

    color: "#64748b",

    border: "none",

    padding: "12px 16px",

    borderRadius: 12,

    fontWeight: 700,
  },

  cancelButton: {
    background: "#e5e7eb",

    color: "#374151",

    border: "none",

    padding: "14px 18px",

    borderRadius: 14,

    fontWeight: 700,

    cursor: "pointer",

    marginTop: 8,
  },
};