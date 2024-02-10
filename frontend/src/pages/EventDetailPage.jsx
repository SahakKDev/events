import { json, redirect, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

export default function EventDetailPage() {
  const { event } = useRouteLoaderData("event-details");

  return <EventItem event={event} />;
}

EventDetailPage.loader = async function loader({ params }) {
  const { eventId } = params;

  const response = await fetch(`http://localhost:8080/events/${eventId}`);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected event." },
      { status: 500 }
    );
  }

  return response;
};

EventDetailPage.action = async function action({ params, request }) {
  const { eventId } = params;

  const response = await fetch(`http://localhost:8080/events/${eventId}`, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({ message: "Could not delete the event." }, { status: 500 });
  }

  return redirect("/events");
};
