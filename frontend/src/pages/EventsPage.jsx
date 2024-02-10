import EventsList from "../components/EventsList";
import { json, useLoaderData } from "react-router-dom";

export default function EventsPage() {
  const { events } = useLoaderData();

  return <EventsList events={events} />;
}

EventsPage.loader = async function loader() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    return response;
  }
};
