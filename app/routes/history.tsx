import { useEffect, useState } from "react";

const CATEGORIES = [
  "Goals",
  "Progress",
  "Happy",
  "Meaning",
  "Social",
  "Engaged"
];

interface Checkin {
  date: string;
  scores: number[];
}

// loadUniqueCheckins
function loadUniqueCheckins(): Checkin[] {
  const stored = localStorage.getItem("checkins");
  if (!stored) return [];

  try {
    const parsed: Checkin[] = JSON.parse(stored);
    const seen = new Set<string>();
    return parsed
      .reverse()
      .filter((entry) => {
        if (seen.has(entry.date)) return false;
        seen.add(entry.date);
        return true;
      });
  } catch (err) {
    console.error("Failed to parse checkins from localStorage:", err);
    return [];
  }
}

// CheckinTable
function CheckinTable({ checkins }: { checkins: Checkin[] }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
      <thead>
        <tr>
          <th style={{ textAlign: "left", paddingBottom: "0.5rem", color: "#1e3a8a" }}>Date</th>
          {CATEGORIES.map((cat) => (
            <th
              key={cat}
              style={{
                width: "12%",
                textAlign: "center",
                paddingBottom: "0.5rem",
                color: "#4b5563",
              }}
            >
              {cat}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {checkins.map((entry, idx) => (
          <tr
            key={entry.date}
            style={{
              backgroundColor: idx % 2 === 0 ? "#f9fafb" : "white",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <td style={{ padding: "0.5rem 0", color: "#374151" }}>{entry.date}</td>
            {entry.scores.map((score, i) => (
              <td
                key={i}
                style={{
                  width: "12%",
                  textAlign: "center",
                  color: "#111827",
                }}
              >
                {score}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// History function - the main function for this page
export default function History() {
  const [checkins, setCheckins] = useState<Checkin[]>([]);

  useEffect(() => {
    setCheckins(loadUniqueCheckins());
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

          <CheckinTable checkins={checkins} />
        )}

        <div style={{ marginBottom: "1rem" }}>
          <a
            href="/"
                style={{
                color: "#4f46e5",
              textDecoration: "none",
              fontSize: "0.9rem",
              }}
          >
            ← Back to Check-In
          </a>
        </div>
      </div>
    </div>
  );
}