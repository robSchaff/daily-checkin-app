import { useEffect, useState } from "react";

interface Checkin {
  date: string;
  scores: number[];
}

export default function History() {
  const [checkins, setCheckins] = useState<Checkin[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("checkins");
    if (stored) {
      try {
        const parsed: Checkin[] = JSON.parse(stored);
        parsed.sort((a, b) => b.date.localeCompare(a.date)); // 🔁 newest first
        setCheckins(parsed);
      } catch (err) {
        console.error("Failed to parse checkins from localStorage:", err);
      }
    }
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Segoe UI', Roboto, Helvetica, sans-serif",
        padding: "2rem",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem 3rem",
          borderRadius: "1rem",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", color: "#1e3a8a", marginBottom: "1rem" }}>
          📊 Your Check-In History
        </h1>

        <p style={{ marginBottom: "1rem", color: "#4b5563" }}>
           You’ve checked in <strong>{checkins.length}</strong> {checkins.length === 1 ? "time" : "times"}.
          </p>

        {checkins.length === 0 ? (
          <p>No check-ins yet.</p>
        ) : (

          <ul style={{ listStyle: "none", padding: 0 }}>
            {checkins.map((entry, idx) => (
              <li
                key={idx}
                style={{
                  marginBottom: "1.25rem",
                  borderBottom: "1px solid #e5e7eb",
                  paddingBottom: "1rem",
                }}
              >
                <strong style={{ color: "#374151" }}>{entry.date}</strong>
                <div style={{ fontSize: "0.95rem", color: "#4b5563", marginTop: "0.25rem" }}>
                  Scores: {entry.scores.join(", ")}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}