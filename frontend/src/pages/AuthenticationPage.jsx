import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { BASE_URL, POST } from "../constants";

export default function AuthenticationPage() {
  return <AuthForm />;
}

AuthenticationPage.action = async function action({ request }) {
  const mode = new URL(request.url).searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode." }, { status: 422 });
  }

  const data = await request.formData();
  const authData = Object.fromEntries(data);

  const response = await fetch(`${BASE_URL}/${mode}`, {
    method: POST,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem("token", token);

  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());

  return redirect("/");
};
