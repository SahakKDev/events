// Challenge / Exercise

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import EditEventPage from "./pages/EditEventPage";
import EventDetailPage from "./pages/EventDetailPage";
import NewEventPage from "./pages/NewEventPage";
import RootPage from "./pages/RootPage";
import EventsRootPage from "./pages/EventsRootPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRootPage />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: EventsPage.loader,
          },
          {
            path: ":eventId",
            id: "event-details",
            loader: EventDetailPage.loader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: EventDetailPage.action,
              },
              { path: "edit", element: <EditEventPage /> },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: NewEventPage.action,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
