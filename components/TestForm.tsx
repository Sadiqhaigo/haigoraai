"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TestForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    curriculum:
      "Nigerian Primary Curriculum",
  
    customCurriculum: "",
  
    level: "",
  
    subject: "",
  
    topic: "",
  
    numberOfQuestions: "10",
  
    testType: "Objective",
  
    duration: "30 Minutes",
  
    difficulty: "Moderate",
  });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const curriculumOptions = [
    "Nigerian Primary Curriculum",

    "Nigerian Junior Secondary Curriculum",

    "WAEC Curriculum",

    "NECO Curriculum",

    "NCCE Curriculum",

    "NBTE Curriculum",

    "CCMAS Curriculum",

    "Nursing & Health Sciences Curriculum",

    "Medical & Allied Health Curriculum",

    "Legal Education Curriculum",

    "CBC Curriculum",

    "CAPS Curriculum",

    "Cambridge Curriculum",

    "IGCSE Curriculum",

    "IB Curriculum",

    "American Curriculum",

    "British Curriculum",

    "Others",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleGenerate =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      setLoading(true);

      setError("");

      try {
        const finalCurriculum =
          form.curriculum ===
          "Others"
            ? form.customCurriculum
            : form.curriculum;

        const payload = {
          ...form,

          curriculum:
            finalCurriculum,
        };

        const res =
          await fetch(
            "/api/generate-test",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify(
                payload
              ),
            }
          );

        const data =
          await res.json();

        if (!res.ok) {
          throw new Error(
            data.error ||
            "HaigoraAI could not generate content right now. Please try again in a moment."
          );
        }

        {error && (
          <button
            type="button"
            onClick={() => {
              setError("");
            }}
            style={{
              background: "transparent",
              border: "none",
              color: "#2563eb",
              cursor: "pointer",
              marginTop: 10,
              fontWeight: 600,
            }}
          >
            Try Again
          </button>
        )}

        router.push(
          `/history/${data.id}`
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
    <form
      onSubmit={
        handleGenerate
      }
      style={styles.form}
    >
      <div style={styles.grid}>
        {/* CURRICULUM */}
        <div style={styles.group}>
          <label style={styles.label}>
            Curriculum Type
          </label>

          <select
            name="curriculum"
            value={
              form.curriculum
            }
            onChange={
              handleChange
            }
            style={styles.input}
          >
            {curriculumOptions.map(
              (
                curriculum
              ) => (
                <option
                  key={
                    curriculum
                  }
                >
                  {curriculum}
                </option>
              )
            )}
          </select>
        </div>

        {/* CUSTOM CURRICULUM */}
        {form.curriculum ===
          "Others" && (
          <div
            style={
              styles.group
            }
          >
            <label
              style={
                styles.label
              }
            >
              Custom Curriculum
            </label>

            <input
              type="text"
              name="customCurriculum"
              placeholder="Enter curriculum name"
              value={
                form.customCurriculum
              }
              onChange={
                handleChange
              }
              style={
                styles.input
              }
              required
            />
          </div>
        )}

        {/* LEVEL */}
        <div style={styles.group}>
          <label style={styles.label}>
            Class / Level
          </label>

          <input
            type="text"
            name="level"
            placeholder="e.g. SS2, Basic 5, 300 Level"
            value={form.level}
            onChange={
              handleChange
            }
            style={styles.input}
            required
          />
        </div>

        {/* SUBJECT */}
        <div style={styles.group}>
          <label style={styles.label}>
            Subject / Course
          </label>

          <input
            type="text"
            name="subject"
            placeholder="e.g. Mathematics"
            value={
              form.subject
            }
            onChange={
              handleChange
            }
            style={styles.input}
            required
          />
        </div>

        {/* TOPIC */}
        <div style={styles.group}>
          <label style={styles.label}>
            Topic
          </label>

          <input
            type="text"
            name="topic"
            placeholder="e.g. Algebra"
            value={form.topic}
            onChange={
              handleChange
            }
            style={styles.input}
            required
          />
        </div>

        {/* DURATION */}
        <div style={styles.group}>
          <label style={styles.label}>
            Duration
          </label>

          <input
            type="text"
            name="duration"
            placeholder="e.g. 30 Minutes"
            value={form.duration}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        {/* NUMBER OF QUESTIONS */}
        <div style={styles.group}>
          <label style={styles.label}>
            Number of Questions
          </label>

          <input
            type="number"
            name="numberOfQuestions"
            value={
              form.numberOfQuestions
            }
            onChange={
              handleChange
            }
            style={styles.input}
            required
          />
        </div>

        {/* TEST TYPE */}
        <div style={styles.group}>
          <label style={styles.label}>
            Test Type
          </label>

          <select
            name="testType"
            value={form.testType}
            onChange={handleChange}
            style={styles.input}
          >
            <option>
              Objective
            </option>

            <option>
              Subjective
            </option>

            <option>
              Mixed
            </option>
          </select>

        </div>

        {/* DIFFICULTY */}
        <div style={styles.group}>
          <label style={styles.label}>
            Difficulty
          </label>

          <select
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
            style={styles.input}
          >
            <option>Easy</option>

            <option>Moderate</option>

            <option>Hard</option>

            <option>Mixed</option>
          </select>
        </div>

      </div>

      {error && (
        <div style={styles.error}>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        style={styles.button}
      >
        {loading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                border:
                  "2px solid rgba(255,255,255,0.4)",
                borderTop:
                  "2px solid #fff",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />

            <span>
              Generating Content...
            </span>
          </div>
        ) : (
          "Generate Test Questions"
        )}
      </button>

    </form>
  );
}

const styles: any = {
  form: {
    display: "grid",

    gap: 28,
  },

  grid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(260px,1fr))",

    gap: 22,
  },

  group: {
    display: "grid",

    gap: 10,

    minWidth: 0,
  },

  label: {
    fontWeight: 700,

    fontSize: 15,

    color: "#1e293b",
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

    boxSizing:
      "border-box",
  },

  button: {
    background:
    "linear-gradient(135deg,#059669,#065f46)",

    color: "#fff",

    border: "none",

    padding: 18,

    borderRadius: 18,

    fontWeight: 700,

    fontSize: 16,

    cursor: "pointer",

    boxShadow:
      "0 10px 25px rgba(245,158,11,0.25)",
  },

  error: {
    background: "#fee2e2",

    color: "#991b1b",

    padding: 15,

    borderRadius: 14,
  },
};