// last working version
 import { Form } from "react-router";

const questions = [
  "Did I do my best to set clear goals?",
  "Did I do my best to make progress toward goal achievement?",
  "Did I do my best to be happy?",
  "Did I do my best to find meaning?",
  "Did I do my best to build positive relationships?",
  "Did I do my best to be fully engaged?"
];

export default function Home() {
  return (
    <div
    style={{
      backgroundColor: "#f9fafb", // soft gray
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
        maxWidth: "500px",
        width: "100%",
      }}
    >
      <h1>Daily Check-In</h1>
      <Form method="post">
        {questions.map((q, i) => (
          <div key={i} style={{ marginBottom: "1rem" }}>
            <label>
              {q}
              <input
                type="number"
                name={`q${i}`}
                min="1"
                max="10"
                style={{ marginLeft: "1rem", width: "50px" }}
              />
            </label>
          </div>
        ))}

        <div style={{ textAlign: "center" }}>
          <button
            type="submit"
            style={{
            backgroundColor: "#4f46e5",
            color: "white",
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
            transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#4338ca")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#4f46e5")
            }
          >
          Submit Check-In
          </button>
        </div>
      </Form>
    </div>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const scores = [];

  for (let i = 0; i < 6; i++) {
    scores.push(formData.get(`q${i}`));
  }

  console.log("📝 Received scores:", scores);
  return null;
}  