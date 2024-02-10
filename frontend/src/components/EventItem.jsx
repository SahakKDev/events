import { Link, useSubmit } from "react-router-dom";
import classes from "./EventItem.module.css";

export default function EventItem({ event }) {
  const submit = useSubmit();

  function startDeleteHandler() {
    const yes = window.confirm(
      "Are your sure that you want to delete the event?"
    );

    if (yes) {
      submit(null, { method: "DELETE" });
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}
