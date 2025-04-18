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


// this was my first test code
// export default function Home() {
//   return (
//     <div>
//       <h1>Daily Check-In</h1>
//       <p>This is the start of something new.</p>
//     </div>
//   );
// }


import { json } from "@remix-run/node";
import { Form } from "@remix-run/react";

export default function Home() {
  return (
    <div>
      <h1>Daily Check-In</h1>
      <Form method="post">
        <label>
          Example Input:
          <input type="text" name="example" />
        </label>
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const value = formData.get("example");
  console.log("📝 Received from form:", value);
  return json({ success: true });
};