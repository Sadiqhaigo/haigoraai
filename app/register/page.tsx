"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",

    email: "",

    password: "",

    confirmPassword: "",

    role: "educator",

    state: "",
  });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleRegister =
    async () => {
      setError("");

      if (
        form.password !==
        form.confirmPassword
      ) {
        setError(
          "Passwords do not match"
        );

        return;
      }

      if (
        form.password.length <
        6
      ) {
        setError(
          "Password should be at least 6 characters"
        );

        return;
      }

      try {
        setLoading(true);

        const res =
          await fetch(
            "/api/register",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify(
                form
              ),
            }
          );

        const data =
          await res.json();

        if (!res.ok) {
          throw new Error(
            data.error ||
              "Registration failed"
          );
        }

        router.push(
          "/login"
        );
      } catch (err: any) {
        setError(
          err.message ||
            "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div style={styles.page}>
      {/* LEFT SIDE */}
      <div style={styles.left}>
        <div
          style={styles.overlay}
        />

        <div
          style={
            styles.leftContent
          }
        >
          <div
            style={
              styles.logoWrap
            }
          >
            <div
              style={
                styles.logoCircle
              }
            >
              H
            </div>

            <div>
              <h1
                style={
                  styles.logo
                }
              >
                Haigora AI
              </h1>

              <p
                style={
                  styles.logoSub
                }
              >
                AI Curriculum
                Intelligence
                for Educators
              </p>
            </div>
          </div>

          <div
            style={
              styles.heroCard
            }
          >
            <p
              style={
                styles.badge
              }
            >
              Join the Future
              of Smart Teaching
            </p>

            <h2
              style={
                styles.heading
              }
            >
              Transform Lesson
              Preparation
              Forever
            </h2>

            <p
              style={
                styles.text
              }
            >
              Join educators
              using AI to
              generate
              structured,
              curriculum-aligned
              lesson and
              lecture notes in
              seconds.
            </p>

            <div
              style={
                styles.featureBox
              }
            >
              <div
                style={
                  styles.feature
                }
              >
                ✔ Curriculum
                Aligned
              </div>

              <div
                style={
                  styles.feature
                }
              >
                ✔ Professional
                Lesson Structure
              </div>

              <div
                style={
                  styles.feature
                }
              >
                ✔ Save Hours
                Weekly
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div style={styles.right}>
        <div style={styles.card}>
          <div
            style={
              styles.topText
            }
          >
            <h2
              style={
                styles.title
              }
            >
              Create Account
            </h2>

            <p
              style={
                styles.subTitle
              }
            >
              Start generating
              professional
              lessons instantly.
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div
              style={
                styles.errorBox
              }
            >
              {error}
            </div>
          )}

          {/* FORM */}
          <div style={styles.form}>
            <div
              style={
                styles.inputGroup
              }
            >
              <label
                style={
                  styles.label
                }
              >
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={
                  handleChange
                }
                style={
                  styles.input
                }
              />
            </div>

            <div
              style={
                styles.inputGroup
              }
            >
              <label
                style={
                  styles.label
                }
              >
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={
                  handleChange
                }
                style={
                  styles.input
                }
              />
            </div>

            <div
              style={
                styles.inputGroup
              }
            >
              <label
                style={
                  styles.label
                }
              >
                Role Type
              </label>

              <select
                name="role"
                value={form.role}
                onChange={
                  handleChange
                }
                style={
                  styles.input
                }
              >
                <option value="educator">
                  Educator
                </option>

                <option value="student">
                  Student
                </option>
              </select>
            </div>

            <div
              style={
                styles.inputGroup
              }
            >
              <label
                style={
                  styles.label
                }
              >
                State
              </label>

              <input
                type="text"
                name="state"
                placeholder="e.g. Lagos, Kano"
                value={form.state}
                onChange={
                  handleChange
                }
                style={
                  styles.input
                }
              />
            </div>

            <div
              style={
                styles.inputGroup
              }
            >
              <label
                style={
                  styles.label
                }
              >
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Create password"
                value={
                  form.password
                }
                onChange={
                  handleChange
                }
                style={
                  styles.input
                }
              />

              <small
                style={
                  styles.smallText
                }
              >
                Minimum 6
                characters
              </small>
            </div>

            <div
              style={
                styles.inputGroup
              }
            >
              <label
                style={
                  styles.label
                }
              >
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={
                  form.confirmPassword
                }
                onChange={
                  handleChange
                }
                style={
                  styles.input
                }
              />
            </div>

            <button
              onClick={
                handleRegister
              }
              disabled={
                loading
              }
              style={{
                ...styles.button,

                opacity:
                  loading
                    ? 0.7
                    : 1,
              }}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>
          </div>

          <div
            style={
              styles.bottomText
            }
          >
            Already have an
            account?{" "}
            <Link
              href="/login"
              style={styles.link}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: any = {
  page: {
    minHeight: "100vh",

    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(340px,1fr))",

    fontFamily:
      "Arial, sans-serif",

    background:
      "#f8fafc",

    overflowX: "hidden",
  },

  /* LEFT */
  left: {
    position: "relative",

    background:
      "linear-gradient(135deg,#2563eb,#1e3a8a)",

    color: "#fff",

    display: "flex",

    alignItems: "center",

    justifyContent:
      "center",

    padding: "clamp(24px,5vw,50px)",

    overflow: "hidden",

    minHeight: 500,
  },

  overlay: {
    position: "absolute",

    inset: 0,

    background:
      "radial-gradient(circle at top right, rgba(255,255,255,0.15), transparent 40%)",
  },

  leftContent: {
    position: "relative",

    zIndex: 2,

    maxWidth: 520,

    width: "100%",
  },

  logoWrap: {
    display: "flex",

    alignItems: "center",

    gap: 14,

    marginBottom: 40,

    flexWrap: "wrap",
  },

  logoCircle: {
    width: 52,

    height: 52,

    borderRadius: "50%",

    background: "#fff",

    color: "#2563eb",

    display: "flex",

    alignItems: "center",

    justifyContent:
      "center",

    fontWeight: "bold",

    fontSize: 24,

    flexShrink: 0,
  },

  logo: {
    margin: 0,

    fontSize:
      "clamp(28px,5vw,34px)",
  },

  logoSub: {
    margin: 0,

    opacity: 0.9,

    lineHeight: 1.6,
  },

  heroCard: {
    background:
      "rgba(255,255,255,0.08)",

    padding:
      "clamp(24px,5vw,36px)",

    borderRadius: 28,

    backdropFilter:
      "blur(8px)",
  },

  badge: {
    display: "inline-block",

    background:
      "rgba(255,255,255,0.15)",

    padding: "8px 14px",

    borderRadius: 30,

    fontSize: 14,

    marginBottom: 20,
  },

  heading: {
    fontSize:
      "clamp(34px,7vw,52px)",

    lineHeight: 1.1,

    marginBottom: 20,
  },

  text: {
    fontSize:
      "clamp(15px,2vw,18px)",

    lineHeight: 1.8,

    opacity: 0.95,
  },

  featureBox: {
    marginTop: 40,

    display: "grid",

    gap: 16,
  },

  feature: {
    background:
      "rgba(255,255,255,0.1)",

    padding: 16,

    borderRadius: 14,

    backdropFilter:
      "blur(6px)",
  },

  /* RIGHT */
  right: {
    display: "flex",

    alignItems: "center",

    justifyContent:
      "center",

    padding:
      "clamp(20px,5vw,50px)",
  },

  card: {
    width: "100%",

    maxWidth: 520,

    background: "#fff",

    borderRadius: 28,

    padding:
      "clamp(24px,5vw,42px)",

    boxShadow:
      "0 20px 40px rgba(0,0,0,0.08)",
  },

  topText: {
    marginBottom: 30,
  },

  title: {
    fontSize:
      "clamp(30px,5vw,40px)",

    marginBottom: 10,

    color: "#111827",
  },

  subTitle: {
    color: "#6b7280",

    lineHeight: 1.7,
  },

  form: {
    display: "grid",

    gap: 18,
  },

  inputGroup: {
    display: "grid",

    gap: 8,
  },

  label: {
    fontWeight: 600,

    color: "#374151",
  },

  input: {
    padding: "16px 18px",
  
    borderRadius: 14,
  
    border:
      "1px solid #d1d5db",
  
    outline: "none",
  
    fontSize: 16,
  
    width: "100%",
  
    background: "#fff",
  
    color: "#111827",
  
    boxSizing: "border-box",
  
    transition:
      "all 0.2s ease",
  },
  
  inputFocus: {
    border:
      "1px solid #2563eb",
  
    boxShadow:
      "0 0 0 4px rgba(37,99,235,0.1)",
  },

  smallText: {
    color: "#6b7280",

    fontSize: 13,
  },

  button: {
    marginTop: 10,

    background: "#2563eb",

    color: "#fff",

    border: "none",

    padding: 16,

    borderRadius: 14,

    fontWeight: "bold",

    fontSize: 16,

    cursor: "pointer",

    transition:
      "all 0.2s ease",
  },

  errorBox: {
    background: "#fee2e2",

    color: "#991b1b",

    padding: 14,

    borderRadius: 12,

    marginBottom: 20,

    lineHeight: 1.6,
  },

  bottomText: {
    marginTop: 24,

    textAlign: "center",

    color: "#6b7280",

    lineHeight: 1.7,
  },

  link: {
    color: "#2563eb",

    fontWeight: "bold",

    textDecoration: "none",
  },
};