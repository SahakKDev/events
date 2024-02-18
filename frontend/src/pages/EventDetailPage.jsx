import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { getAuthToken, loadEvents } from "../utils";
import { Suspense } from "react";
import { BASE_URL } from "../constants";

export default function EventDetailPage() {
  const { event, events } = useRouteLoaderData("event-details");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

async function loadEvent(eventId) {
  const response = await fetch(`${BASE_URL}/events/${eventId}`);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected event." },
      { status: 500 }
    );
  }

  const data = await response.json();
  return data.event;
}

EventDetailPage.loader = async function loader({ params }) {
  const { eventId } = params;

  return defer({
    event: await loadEvent(eventId),
    events: loadEvents(),
  });
};

EventDetailPage.action = async function action({ params, request }) {
  const { eventId } = params;

  const token = getAuthToken();
  const response = await fetch(`${BASE_URL}/events/${eventId}`, {
    method: request.method,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json({ message: "Could not delete the event." }, { status: 500 });
  }

  return redirect("/events");
};
