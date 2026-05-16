export default function Loading() {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f8fafc",
          padding: 20,
        }}
      >
        <div
          style={{
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 70,
              height: 70,
              border: "6px solid #dbeafe",
              borderTop: "6px solid #2563eb",
              borderRadius: "50%",
              margin: "0 auto 20px",
              animation: "spin 1s linear infinite",
            }}
          />
  
          <p
            style={{
              fontSize: 18,
              color: "#334155",
              fontWeight: 600,
            }}
          >
            Loading HaigoraAI...
          </p>
        </div>
      </div>
    );
  }