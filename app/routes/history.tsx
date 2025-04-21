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

export default function History() {
  const [checkins, setCheckins] = useState<Checkin[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("checkins");
    if (stored) {
      try {
        // Parse the stored check-ins from localStorage
        const parsed: Checkin[] = JSON.parse(stored);

        // Create a Set to track which dates we've already seen
        const seen = new Set<string>();

        // Reverse the array to prioritize the most recent entries first
        const unique = parsed
          .reverse() // latest entries now come first
          .filter((entry) => {
            if (seen.has(entry.date)) return false; // skip if we've already added this date
            seen.add(entry.date); // mark this date as seen
            return true; // keep this entry
           });

        // Store the filtered, sorted entries
        setCheckins(unique);
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

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", paddingBottom: "0.5rem", color: "#1e3a8a" }}>Date</th>
                {CATEGORIES.map((cat) => (
                  <th
                    key={cat}
                    style={{
                      width: "12%", // 6 columns = ~84%, gives room for the date column
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
              {checkins.map((entry) => (
                <tr key={entry.date} style={{ borderTop: "1px solid #e5e7eb" }}>
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
        )}
      </div>
    </div>
  );
}