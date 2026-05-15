"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import AppCard from "@/components/ui/AppCard";

import AppButton from "@/components/ui/AppButton";

import PageHero from "@/components/ui/PageHero";

export default function OnboardingPage() {
  const router = useRouter();

  const [step, setStep] =
    useState(1);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      role: "",

      curriculum: "",

      subjects: [] as string[],
    });

  const roles = [
    "Teacher",
    "Lecturer",
    "School",
    "Academy",
    "Student",
  ];

  const curricula = [
    "WAEC Curriculum",

    "NECO Curriculum",

    "British Curriculum",

    "IGCSE Curriculum",

    "Nigerian Curriculum",

    "Custom Curriculum",
  ];

  const subjects = [
    "ICT",

    "Mathematics",

    "English",

    "Physics",

    "Chemistry",

    "Biology",

    "Economics",

    "Arabic",

    "Islamic Studies",

    "Government",
  ];

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const toggleSubject = (
    subject: string
  ) => {
    setFormData((prev) => ({
      ...prev,

      subjects:
        prev.subjects.includes(
          subject
        )
          ? prev.subjects.filter(
              (s) =>
                s !== subject
            )
          : [
              ...prev.subjects,

              subject,
            ],
    }));
  };

  const finishOnboarding =
    async () => {
      try {
        setLoading(true);

        // FUTURE DATABASE SAVE
        await fetch(
            "/api/onboarding",
            {
              method: "POST",
          
              headers: {
                "Content-Type":
                  "application/json",
              },
          
              body: JSON.stringify(
                formData
              ),
            }
          );

        router.push(
          "/dashboard"
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div style={styles.page}>
      <div
        style={styles.container}
      >
        {/* HERO */}
        <PageHero
          title="Welcome to HaigoraAI"
          subtitle="Your intelligent academic assistant for lesson notes, assignments, tests, exams, curriculum-based educational content and institutional productivity."
        />

        {/* PROGRESS */}
        <div
          style={styles.progressWrap}
        >
          <div
            style={
              styles.progressBar
            }
          >
            <div
              style={{
                ...styles.progressFill,

                width: `${
                  (step / 3) * 100
                }%`,
              }}
            />
          </div>

          <p
            style={
              styles.progressText
            }
          >
            Step {step} of 3
          </p>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <AppCard>
            <h2
              style={styles.title}
            >
              Choose Your Role
            </h2>

            <p
              style={
                styles.subtitle
              }
            >
              Select the role
              that best describes
              how you will use
              HaigoraAI.
            </p>

            <div
              style={
                styles.grid
              }
            >
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() =>
                    setFormData({
                      ...formData,

                      role,
                    })
                  }
                  style={{
                    ...styles.optionCard,

                    border:
                      formData.role ===
                      role
                        ? "2px solid #2563eb"
                        : "1px solid #e2e8f0",
                  }}
                >
                  {role}
                </button>
              ))}
            </div>

            <div
              style={
                styles.buttonRow
              }
            >
              <button
                onClick={() =>
                  router.push(
                    "/dashboard"
                  )
                }
                style={
                  styles.skipBtn
                }
              >
                Skip for now
              </button>

              <AppButton
                onClick={
                  nextStep
                }
              >
                Continue
              </AppButton>
            </div>
          </AppCard>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <AppCard>
            <h2
              style={styles.title}
            >
              Curriculum Preference
            </h2>

            <p
              style={
                styles.subtitle
              }
            >
              Choose your
              preferred
              curriculum
              structure.
            </p>

            <div
              style={
                styles.grid
              }
            >
              {curricula.map(
                (
                  curriculum
                ) => (
                  <button
                    key={
                      curriculum
                    }
                    onClick={() =>
                      setFormData({
                        ...formData,

                        curriculum,
                      })
                    }
                    style={{
                      ...styles.optionCard,

                      border:
                        formData.curriculum ===
                        curriculum
                          ? "2px solid #2563eb"
                          : "1px solid #e2e8f0",
                    }}
                  >
                    {
                      curriculum
                    }
                  </button>
                )
              )}
            </div>

            <div
              style={
                styles.buttonRow
              }
            >
              <AppButton
                variant="secondary"
                onClick={
                  prevStep
                }
              >
                Back
              </AppButton>

              <AppButton
                onClick={
                  nextStep
                }
              >
                Continue
              </AppButton>
            </div>
          </AppCard>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <AppCard>
            <h2
              style={styles.title}
            >
              Preferred Subjects
            </h2>

            <p
              style={
                styles.subtitle
              }
            >
              Select subjects
              you frequently
              teach or manage.
            </p>

            <div
              style={
                styles.grid
              }
            >
              {subjects.map(
                (subject) => (
                  <button
                    key={subject}
                    onClick={() =>
                      toggleSubject(
                        subject
                      )
                    }
                    style={{
                      ...styles.optionCard,

                      border:
                        formData.subjects.includes(
                          subject
                        )
                          ? "2px solid #2563eb"
                          : "1px solid #e2e8f0",
                    }}
                  >
                    {subject}
                  </button>
                )
              )}
            </div>

            <div
              style={
                styles.buttonRow
              }
            >
              <AppButton
                variant="secondary"
                onClick={
                  prevStep
                }
              >
                Back
              </AppButton>

              <AppButton
                onClick={
                  finishOnboarding
                }
              >
                {loading
                  ? "Finishing..."
                  : "Finish Setup"}
              </AppButton>
            </div>
          </AppCard>
        )}
      </div>
    </div>
  );
}

const styles: any = {
  page: {
    minHeight: "100vh",

    background:
      "#f8fafc",

    padding:
      "40px 16px",
  },

  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 16px",

    // maxWidth: 1000,

    // margin: "0 auto",
  },

  progressWrap: {
    marginBottom: 24,
  },

  progressBar: {
    height: 10,

    borderRadius: 999,

    background:
      "#e2e8f0",

    overflow: "hidden",
  },

  progressFill: {
    height: "100%",

    background:
      "linear-gradient(135deg,#2563eb,#1d4ed8)",

    transition:
      "all 0.3s ease",
  },

  progressText: {
    marginTop: 10,

    color: "#64748b",

    fontWeight: 600,
  },

  title: {
    fontSize:
      "clamp(24px,5vw,32px)",

    fontWeight: 800,

    marginBottom: 10,

    color: "#0f172a",
  },

  subtitle: {
    color: "#64748b",

    lineHeight: 1.7,

    marginBottom: 24,
  },

  grid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",

    gap: 16,

    marginBottom: 24,
  },

  optionCard: {
    padding: "18px 20px",

    borderRadius: 18,

    background: "#fff",

    cursor: "pointer",

    fontWeight: 700,

    transition:
      "all 0.2s ease",

    color: "#0f172a",
  },

  buttonRow: {
    display: "flex",

    justifyContent:
      "space-between",

    gap: 12,

    flexWrap: "wrap",
  },

  skipBtn: {
    background: "none",

    border: "none",

    color: "#64748b",

    fontWeight: 700,

    cursor: "pointer",
  },
};