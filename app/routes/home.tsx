//import type { Route } from "./+types/home";
//import { Welcome } from "../welcome/welcome";
//
//export function meta({}: Route.MetaArgs) {
//  return [
//    { title: "New React Router App" },
//    { name: "description", content: "Welcome to React Router!" },
//  ];//
//}

//export default function Home() {
//  return <Welcome />;
//}


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
        <button type="submit">Submit</button>
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
export async function action({ request }) {
  const formData = await request.formData();
  const value = formData.get("example");
  console.log("📝 Received from form:", value);
  return null;
}