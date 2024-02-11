import { json } from "react-router-dom";
import { BASE_URL } from "../constants";

export async function loadEvents() {
  const response = await fetch(`${BASE_URL}/events`);

  if (!response.ok) {
    throw json({ message: "Could not fetch events." }, { status: 500 });
  }

  const data = await response.json();
  return data.events;
}
