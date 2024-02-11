import EventForm from "../components/EventForm";
import { POST } from "../constants";

export default function NewEventPage() {
  return <EventForm method={POST} />;
}
