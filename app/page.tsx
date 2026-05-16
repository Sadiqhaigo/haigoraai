"use client";

import Link from "next/link";

import { useState } from "react";

export default function Page() {
  const [mobileMenu, setMobileMenu] =
  useState(false);
  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <nav style={styles.nav}>
  <div style={styles.logoWrap}>
    <div style={styles.logoCircle}>
      H
    </div>

    <div>
      <h2 style={styles.logo}>
        HaigoraAI
      </h2>

      <p style={styles.logoSub}>
        AI Curriculum
        Intelligence for
        Educators
      </p>
    </div>
  </div>

  {/* MOBILE MENU BUTTON */}
  <button
  className="mobile-menu-btn"
  onClick={() =>
    setMobileMenu(
      !mobileMenu
    )
  }
  style={styles.menuButton}
>
    ☰
  </button>

  {/* NAV LINKS */}
  <div
  className={
    mobileMenu
      ? "mobile-open"
      : "mobile-hide-nav"
  }
  style={{
    ...styles.navLinks,

    ...(mobileMenu
      ? styles.mobileNavOpen
      : {}),
  }}
>
    <a
      href="#features"
      style={styles.navLink}
    >
      Features
    </a>

    <a
      href="#demo"
      style={styles.navLink}
    >
      Demo
    </a>

    <a
      href="#testimonials"
      style={styles.navLink}
    >
      Testimonials
    </a>

    <Link
      href="/login"
      style={styles.loginBtn}
    >
      Login
    </Link>

    <Link
      href="/register"
      style={styles.primaryBtn}
    >
      Get Started
    </Link>
  </div>
</nav>

      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroLeft}>
          <div style={styles.badge}>
            Trusted AI Assistant for Teachers & Lecturers
          </div>

          <h1 style={styles.heroTitle}>
            Generate Complete Curriculum-Aligned Academic Contents in Seconds
          </h1>

          <p style={styles.heroText}>
            HaigoraAI helps educators save hours of preparation by generating
            structured, ready-to-teach lesson and lecture notes aligned with
            curriculum standards.
          </p>

          <div style={styles.heroActions}>
            <Link href="/register" style={styles.primaryBtnLarge}>
              Start Free
            </Link>

            <a href="#demo" style={styles.secondaryBtn}>
              View Demo
            </a>
          </div>

          <div style={styles.heroStats}>
            <div>
              <h3>Fast</h3>
              <p>Generate in seconds</p>
            </div>

            <div>
              <h3>Structured</h3>
              <p>Professional formatting</p>
            </div>

            <div>
              <h3>Smart</h3>
              <p>Curriculum-aware AI</p>
            </div>
          </div>
        </div>

        {/* HERO RIGHT */}
        <div style={styles.heroRight}>
          <div style={styles.previewCard}>
            <div style={styles.previewTop}>
              <div style={styles.dotRed}></div>
              <div style={styles.dotYellow}></div>
              <div style={styles.dotGreen}></div>
            </div>

            <div style={styles.previewBody}>
              <p style={styles.previewLabel}>Generated Lesson Preview</p>

              <h3 style={styles.previewTitle}>
                Subject: Mathematics
              </h3>

              <p style={styles.previewText}>
                Topic: Fractions
              </p>

              <p style={styles.previewText}>
                Learning Objectives:
              </p>

              <ul style={styles.previewList}>
                <li>Define fractions</li>
                <li>Solve simple fraction problems</li>
                <li>Apply fractions in daily life</li>
              </ul>

              <div style={styles.previewLine}></div>
              <div style={styles.previewLineSmall}></div>
              <div style={styles.previewLine}></div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section style={styles.trust}>
        <p>
          Designed for schools, colleges, universities and educators who value
          speed, structure and quality.
        </p>
      </section>

      {/* FEATURES */}
      <section id="features" style={styles.section}>
        <div style={styles.sectionHead}>
          <p style={styles.sectionMini}>FEATURES</p>

          <h2 style={styles.sectionTitle}>
            Everything Educators Need
          </h2>

          <p style={styles.sectionText}>
            Built to simplify lesson preparation while maintaining educational
            standards and professionalism.
          </p>
        </div>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h3>Curriculum Aligned</h3>

            <p>
              Supports WAEC, NECO, NUC, NBTE and state curriculum structures.
            </p>
          </div>

          <div style={styles.card}>
            <h3>Detailed Teaching Content</h3>

            <p>
              Generates complete explanations teachers can teach directly from.
            </p>
          </div>

          <div style={styles.card}>
            <h3>Professional Formatting</h3>

            <p>
              Structured output with objectives, timing, assessment and summary.
            </p>
          </div>

          <div style={styles.card}>
            <h3>Export & History</h3>

            <p>
              Download lessons as Word/PDF and revisit previous lessons anytime.
            </p>
          </div>

          <div style={styles.card}>
            <h3>Smart User Profiles</h3>

            <p>
              Automatically personalizes generated lessons based on educator data.
            </p>
          </div>

          <div style={styles.card}>
            <h3>Time Saving</h3>

            <p>
              Reduce hours of manual lesson writing into a few seconds.
            </p>
          </div>
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" style={styles.demoSection}>
        <div style={styles.sectionHead}>
          <p style={styles.sectionMini}>LIVE EXPERIENCE</p>

          <h2 style={styles.sectionTitle}>
            Simple. Fast. Professional.
          </h2>
        </div>

        <div style={styles.demoCard}>
          <div style={styles.demoInput}>Subject: English Language</div>
          <div style={styles.demoInput}>Topic: Noun</div>
          <div style={styles.demoInput}>Class: Basic 5</div>
          <div style={styles.demoBtn}>
            <Link href="/register">
              Generate Lesson
            </Link>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section style={styles.sectionAlt}>
        <div style={styles.sectionHead}>
          <p style={styles.sectionMini}>WHY CHOOSE US</p>

          <h2 style={styles.sectionTitle}>
            Built Around Real Teaching Challenges
          </h2>
        </div>

        <div style={styles.whyGrid}>
          <div style={styles.whyCard}>
            Teachers spend too much time preparing lesson notes manually.
          </div>

          <div style={styles.whyCard}>
            Many AI tools are generic and not curriculum-aware.
          </div>

          <div style={styles.whyCard}>
            HaigoraAI combines structure, speed and educational relevance.
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" style={styles.section}>
        <div style={styles.sectionHead}>
          <p style={styles.sectionMini}>TESTIMONIALS</p>

          <h2 style={styles.sectionTitle}>
            What Educators Say
          </h2>
        </div>

        <div style={styles.grid}>
          <div style={styles.testimonial}>
            “HaigoraAI reduced my preparation stress significantly.”
          </div>

          <div style={styles.testimonial}>
            “I now generate lecture notes in minutes instead of hours.”
          </div>

          <div style={styles.testimonial}>
            “The curriculum structure makes it different from generic AI tools.”
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={styles.cta}>
        <h2 style={styles.ctaTitle}>
          Ready to Transform Lesson Preparation?
        </h2>

        <p style={styles.ctaText}>
          Join educators using AI to prepare smarter and faster.
        </p>

        <Link href="/register" style={styles.ctaBtn}>
          Get Started Free
        </Link>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div>
          <h3>HaigoraAI</h3>

          <p>AI Curriculum Intelligence for Educators</p>
        </div>

        <div>
          <p>Support</p>
          <p>support@haigora.ai</p>
        </div>
      </footer>
    </div>
  );
}

const styles: any = {
  page: {
    fontFamily: "Arial, sans-serif",
    background: "#f8fafc",
    color: "#111827",
  },

  nav: {
    display: "flex",
  
    justifyContent:
      "space-between",
  
    alignItems: "center",
  
    padding: "12px 24px",
  
    background:
      "rgba(255,255,255,0.9)",
  
    backdropFilter:
      "blur(10px)",
  
    position: "sticky",
  
    top: 0,
  
    zIndex: 1000,
  
    borderBottom:
      "1px solid #e5e7eb",
  
    gap: 10,
  
    flexWrap: "wrap",
  
    overflow: "hidden",
  },

  menuButton: {
    background: "none",
  
    border: "none",
  
    fontSize: 28,
  
    color: "#2563eb",
  
    cursor: "pointer",
  
    display: "none",
  },
  
  mobileMenuOpen: {
    display: "flex",
  },

  mobileNavOpen: {
    display: "flex",
  },

  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  logoCircle: {
    width: 42,
    height: 42,
    borderRadius: "50%",
    background: "#2563eb",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 20,
  },

  logo: {
    margin: 0,
    color: "#2563eb",
  },

  logoSub: {
    margin: 0,
    fontSize: 12,
    color: "#6b7280",
  },

  navLinks: {
    display: "flex",
  
    alignItems: "center",
  
    gap: 18,
  
    flexWrap: "wrap",
  },

  navLink: {
    textDecoration: "none",
    color: "#374151",
    fontWeight: 300,
  },

  loginBtn: {
    textDecoration: "none",
    color: "#2563eb",
    fontWeight: 600,
  },

  primaryBtn: {
    background: "#2563eb",
    color: "#fff",
    padding: "10px 18px",
    borderRadius: 10,
    textDecoration: "none",
    fontWeight: 600,
  },

  hero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "80px 50px",
    gap: 40,
    flexWrap: "wrap",
    background:
      "linear-gradient(to bottom right, #eff6ff, #ffffff)",
  },

  heroLeft: {
    flex: 1,
    minWidth: 300,
  },

  badge: {
    display: "inline-block",
    background: "#dbeafe",
    color: "#2563eb",
    padding: "8px 14px",
    borderRadius: 30,
    marginBottom: 20,
    fontSize: 14,
    fontWeight: 600,
  },

  heroTitle: {
    fontSize: "clamp(32px,8vw,60px)",
    lineHeight: 1.1,
    marginBottom: 20,
    wordBreak: "break-word",
  },

  heroText: {
    fontSize: 18,
    color: "#4b5563",
    lineHeight: 1.7,
    maxWidth: 650,
  },

  heroActions: {
    display: "flex",
    gap: 14,
    marginTop: 30,
    flexWrap: "wrap",
  },

  primaryBtnLarge: {
    background: "#2563eb",
    color: "#fff",
    padding: "14px 26px",
    borderRadius: 12,
    textDecoration: "none",
    fontWeight: 700,
    fontSize: 16,
  },

  secondaryBtn: {
    border: "1px solid #2563eb",
    color: "#2563eb",
    padding: "14px 26px",
    borderRadius: 12,
    textDecoration: "none",
    fontWeight: 600,
  },

  heroStats: {
    display: "flex",
    gap: 40,
    marginTop: 40,
    flexWrap: "wrap",
  },

  heroRight: {
    flex: 1,
    minWidth: 320,
    display: "flex",
    justifyContent: "center",
  },

  previewCard: {
    width: 400,
    background: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
  },

  previewTop: {
    display: "flex",
    gap: 8,
    padding: 16,
    background: "#f3f4f6",
  },

  dotRed: {
    width: 12,
    height: 12,
    borderRadius: "50%",
    background: "#ef4444",
  },

  dotYellow: {
    width: 12,
    height: 12,
    borderRadius: "50%",
    background: "#f59e0b",
  },

  dotGreen: {
    width: 12,
    height: 12,
    borderRadius: "50%",
    background: "#10b981",
  },

  previewBody: {
    padding: 24,
  },

  previewLabel: {
    color: "#2563eb",
    fontWeight: 600,
    fontSize: 14,
  },

  previewTitle: {
    marginTop: 16,
  },

  previewText: {
    color: "#4b5563",
  },

  previewList: {
    color: "#4b5563",
    lineHeight: 1.8,
  },

  previewLine: {
    height: 10,
    background: "#e5e7eb",
    borderRadius: 10,
    marginTop: 12,
  },

  previewLineSmall: {
    height: 10,
    width: "70%",
    background: "#e5e7eb",
    borderRadius: 10,
    marginTop: 12,
  },

  trust: {
    padding: 20,
    textAlign: "center",
    color: "#6b7280",
    fontSize: 15,
  },

  section: {
    padding: "90px 50px",
  },

  demoSection: {
    padding: "90px 50px",
    background: "#eef2ff",
  },

  sectionHead: {
    textAlign: "center",
    marginBottom: 50,
  },

  sectionMini: {
    color: "#2563eb",
    fontWeight: 700,
    letterSpacing: 1,
  },

  sectionTitle: {
    fontSize: 40,
    marginTop: 10,
  },

  sectionText: {
    color: "#6b7280",
    maxWidth: 700,
    margin: "auto",
    lineHeight: 1.7,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 24,
  },

 card: {
  background: "#fff",

  borderRadius: 24,

  padding: 24,

  boxShadow:
    "0 10px 30px rgba(0,0,0,0.05)",

  border:
    "1px solid #f1f5f9",
},

  demoCard: {
    maxWidth: 600,
    margin: "auto",
    background: "#fff",
    padding: 30,
    borderRadius: 20,
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  },

  demoInput: {
    background: "#f3f4f6",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  demoBtn: {
    width: "100%",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: 16,
    borderRadius: 12,
    fontWeight: 700,
    cursor: "pointer",
    textAlign: "center",
  },

  sectionAlt: {
    padding: "90px 50px",
    background: "#111827",
    color: "#fff",
  },

  whyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 20,
  },

  whyCard: {
    background: "rgba(255,255,255,0.08)",
    padding: 24,
    borderRadius: 18,
    lineHeight: 1.7,
  },

  testimonial: {
    background: "#fff",
    padding: 30,
    borderRadius: 20,
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    fontStyle: "italic",
  },

  cta: {
    background: "linear-gradient(135deg, #2563eb, #1e40af)",
    color: "#fff",
    padding: "100px 30px",
    textAlign: "center",
  },

  ctaTitle: {
    fontSize: 42,
    marginBottom: 20,
  },

  ctaText: {
    fontSize: 18,
    opacity: 0.9,
  },

  ctaBtn: {
    display: "inline-block",
    marginTop: 30,
    background: "#fff",
    color: "#2563eb",
    padding: "14px 30px",
    borderRadius: 12,
    textDecoration: "none",
    fontWeight: 700,
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 20,
    padding: 40,
    background: "#0f172a",
    color: "#fff",
  },
};