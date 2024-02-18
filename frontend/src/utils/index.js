import { json, redirect } from "react-router-dom";
import { BASE_URL } from "../constants";

export async function loadEvents() {
  const response = await fetch(`${BASE_URL}/events`);

  if (!response.ok) {
    throw json({ message: "Could not fetch events." }, { status: 500 });
  }

  const data = await response.json();
  return data.events;
}

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();

  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = localStorage.getItem("token");

  if (!token) {
    return redirect("/auth");
  }

  return null;
}
