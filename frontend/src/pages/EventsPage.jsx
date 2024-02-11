import { Suspense } from "react";
import EventsList from "../components/EventsList";
import { Await, defer, useLoaderData } from "react-router-dom";
import { loadEvents } from "../utils";

export default function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

EventsPage.loader = function loader() {
  return defer({
    events: loadEvents(),
  });
};
