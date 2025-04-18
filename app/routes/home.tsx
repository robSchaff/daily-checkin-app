import { Form } from "react-router";
import { json } from "react"
import { useEffect } from "react";

const questions = [
  "Did I do my best to set clear goals?",
  "Did I do my best to make progress toward goal achievement?",
  "Did I do my best to be happy?",
  "Did I do my best to find meaning?",
  "Did I do my best to build positive relationships?",
  "Did I do my best to be fully engaged?"
];

export function Home() {
  return (
    <div>
      <h1>Daily Check-In</h1>
      <Form method="post">
        {questions.map((q, i) => (
          <div key={i}>
            <label>
              {q}
              <input
                type="number"
                name={`q${i}`}
                min="1"
                max="10"
                required
                style={{ marginLeft: "1rem", width: "50px" }}
              />
            </label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}
  
  export async function clientAction({ request }: { request: Request }) {
    const formData = await request.formData();
    const scores = Array.from({ length: 6 }, (_, i) => formData.get(`q${i}`));
  
    const entry = {
      date: new Date().toISOString().split("T")[0],
      scores,
    };
  
    const existing = JSON.parse(localStorage.getItem("checkins") || "[]");
    const updated = [...existing, entry];
    localStorage.setItem("checkins", JSON.stringify(updated));
  
    console.log("💾 Saved to localStorage:", entry);
  
    return null;
  }

  export async function loader() {
    return json({});
  }