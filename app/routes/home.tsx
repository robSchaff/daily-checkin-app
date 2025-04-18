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
    <div>
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

        <button
          type="submit"
          style={{
            backgroundColor: "#4f46e5", // Indigo-600
            color: "white",
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4338ca")} // Indigo-700
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4f46e5")} // Indigo-600
        >
        Submit Check-In
        </button>
        
      </Form>
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