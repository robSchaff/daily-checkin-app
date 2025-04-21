 import { Form } from "react-router";
 import { useState } from "react";
 import type { CSSProperties } from "react";

 // Define types
 interface QuestionProps {
  question: string;
  index: number;
  value: number;
  onChange: (index : number, value: number) => void;
 }

 // Constants
const QUESTIONS = [
  "Did I do my best to set clear goals?",
  "Did I do my best to make progress toward my goals?",
  "Did I do my best to be happy?",
  "Did I do my best to find meaning?",
  "Did I do my best to build positive relationships?",
  "Did I do my best to be fully engaged?"
];

// Styles separated as objects
const styles: Record<string, CSSProperties> = {
  container: {
    backgroundColor: "#f9fafb",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Segoe UI', Roboto, Helvetica, sans-serif",
    padding: "2rem",
  },
  card: {
    backgroundColor: "white",
    padding: "2rem 3rem",
    borderRadius: "1rem",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    maxWidth: "500px",
    width: "100%",
  },
  header: {
    textAlign: "center" as const, // Use "as const" to specify literal type
  },
  title: {
    marginBottom: "1.5rem",
    fontSize: "2rem",
    fontWeight: 700,
    color: "#1e3a8a",
    textAlign: "center" as const,
    letterSpacing: "-0.5px",
  },
  questionContainer: {
    marginBottom: "1rem",
  },
  input: {
    marginLeft: "1rem",
    width: "50px",
  },
  buttonContainer: {
    textAlign: "center",
  },
  button: {
    backgroundColor: "#1e3a8a",
    color: "white",
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
    transition: "background-color 0.3s",
  }
};

// Extracted Question component - updated to Sliders with help from ChatGPT
function Question({ question, index, value, onChange }: QuestionProps) {
  return (
    <div style={styles.questionContainer}>
      <label style={{ 
        display: "block", 
        marginBottom: "0.25rem", 
        fontWeight: 500,
        color: "#1f2937"  // slate-800 or pick another readable color
        }}
      >        
        {question}
        <input
          type="range"
          name={`q${index}`}
          min="1"
          max="5"
          value={value}
          onChange={(e) => onChange(index, parseInt(e.target.value))}
          style={{
            width: "100%",
            marginTop: "0.5rem",
            accentColor: "#4f46e5",
          }}
        />
      </label>
      <div style={{ textAlign: "right", fontSize: "0.875rem", color: "#374151" }}>
        {value ? `Selected: ${value}` : "No selection"}
      </div>
    </div>
  );
}

// Button component with hover functionality
function SubmitButton() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button
      type="submit"
      style={{
        ...styles.button,
        backgroundColor: isHovered ? "#4338ca" : "#1e3a8a",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Submit Check-In
    </button>
  );
}

export default function Home() {
  // State to manage form values
  const [scores, setScores] = useState<number[]>(Array(QUESTIONS.length).fill(3)); // default to midpoint
  const [saved, setSaved] = useState(false);  
  
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Update individual score
  const handleScoreChange = (index: number, value: number) => {
    const newScores = [...scores];
    newScores[index] = value;
    setScores(newScores);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Daily Check-In</h1>
          <p style={{ marginTop: "-0.5rem", color: "#6b7280", fontSize: "0.95rem" }}>
            {today}
          </p>
        </div>
        
        <Form
          method="post"
          onSubmit={(e) => {
            e.preventDefault(); // 🛑 prevent form from reloading the page
          
            const entry = {
              date: new Date().toLocaleDateString("en-CA"),
              scores,
            };
            const existing = JSON.parse(localStorage.getItem("checkins") || "[]");
            const updated = [...existing, entry];
            localStorage.setItem("checkins", JSON.stringify(updated));

            setSaved(true);
            setTimeout(() => setSaved(false), 2500); // clears after 2.5 seconds
          }}
        >

          {QUESTIONS.map((question, index) => (
            <Question
              key={index}
              question={question}
              index={index}
              value={scores[index]}
              onChange={handleScoreChange}
            />
          ))}

          <div style={styles.buttonContainer}>
            <SubmitButton />
            {saved && (
              <p style={{ color: "#10b981", marginTop: "0.5rem", textAlign: "center" }}>
                ✔️ Check-in saved!
              </p>
            )}
          </div>
          
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <a
              href="/history"
              style={{
              fontSize: "0.9rem",
              color: "#4f46e5",
              textDecoration: "none",
              }}
            >
            📊 View History
            </a>
          </div>

        </Form>
      </div>
    </div>
  );
}


export async function action() {
  return null;
}
