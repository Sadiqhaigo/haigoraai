"use client";

import Link from "next/link";

import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";

import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",

    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleLogin =
    async () => {
      try {
        setLoading(true);

        setError("");

        const res =
          await signIn(
            "credentials",
            {
              redirect: false,

              email:
                form.email,

              password:
                form.password,
            }
          );

        if (res?.error) {
          setError(
            "Invalid email or password"
          );

          setLoading(false);

          return;
        }

        router.push(
          "/dashboard"
        );
      } catch (err) {
        setError(
          "Something went wrong. Please try again."
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
              Smart Teaching
              Starts Here
            </p>

            <h2
              style={
                styles.heading
              }
            >
              Welcome Back, <b>Login</b> and Start...
            </h2>

            <p
              style={
                styles.text
              }
            >
              Continue
              generating
              structured,
              curriculum-aligned
              lesson and
              lecture notes in
              seconds.
            </p>

            <div
              style={
                styles.stats
              }
            >
              <div
                style={
                  styles.statBox
                }
              >
                <h3>✔ Fast</h3>

                <p>
                  Generate
                  instantly
                </p>
              </div>

              <div
                style={
                  styles.statBox
                }
              >
                <h3>
                ✔ Professional
                </h3>

                <p>
                  Structured
                  outputs
                </p>
              </div>

              <div
                style={
                  styles.statBox
                }
              >
                <h3>
                ✔ Reliable
                </h3>

                <p>
                  Built for
                  educators
                </p>
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
              styles.cardTop
            }
          >
            <h2
              style={
                styles.title
              }
            >
              Login
            </h2>

            <p
              style={
                styles.subTitle
              }
            >
              Access your
              educator
              workspace
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
              <div
                style={
                  styles.passwordTop
                }
              >
                <label
                  style={
                    styles.label
                  }
                >
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  style={styles.forgot}
                >
                  Forgot Password?
                </Link>
              </div>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
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
            </div>

            <button
              onClick={
                handleLogin
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
                ? "Signing In..."
                : "Login"}
            </button>
          </div>

          <div
            style={
              styles.bottomText
            }
          >
            Don&apos;t have an
            account?{" "}
            <Link
              href="/register"
              style={styles.link}
            >
              Create Account
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

    background:
      "#f8fafc",

    fontFamily:
      "Arial, sans-serif",

    overflowX: "hidden",
  },

  /* LEFT */
  left: {
    position: "relative",

    background:
      "linear-gradient(135deg,#1d4ed8,#1e3a8a)",

    overflow: "hidden",

    display: "flex",

    alignItems: "center",

    justifyContent:
      "center",

    padding:
      "clamp(24px,5vw,50px)",

    color: "#fff",

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

  stats: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(120px,1fr))",

    gap: 16,

    marginTop: 40,
  },

  statBox: {
    background:
      "rgba(255,255,255,0.08)",

    padding: 16,

    borderRadius: 16,

    textAlign: "center",
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

    maxWidth: 480,

    background: "#fff",

    padding:
      "clamp(24px,5vw,42px)",

    borderRadius: 28,

    boxShadow:
      "0 20px 40px rgba(0,0,0,0.08)",
  },

  cardTop: {
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

    gap: 20,
  },

  inputGroup: {
    display: "grid",

    gap: 8,
  },

  passwordTop: {
    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",

    gap: 12,

    flexWrap: "wrap",
  },

  forgot: {
    color: "#2563eb",

    textDecoration: "none",

    fontSize: 14,

    fontWeight: 600,
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