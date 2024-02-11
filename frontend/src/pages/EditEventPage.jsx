import { useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";
import { PATCH } from "../constants";

export default function EditEventPage() {
  const { event } = useRouteLoaderData("event-details");

  return <EventForm event={event} method={PATCH} />;
}
