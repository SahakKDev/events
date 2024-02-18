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
import EventForm from "./components/EventForm";
import NewsletterPage from "./pages/NewsletterPage";
import AuthenticationPage from "./pages/AuthenticationPage";
import { logoutAction } from "./pages/Logout";
import { checkAuthLoader, tokenLoader } from "./utils";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
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
              {
                path: "edit",
                element: <EditEventPage />,
                action: EventForm.action,
                loader: checkAuthLoader,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: EventForm.action,
            loader: checkAuthLoader,
          },
        ],
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: NewsletterPage.action,
      },
      {
        path: "auth",
        element: <AuthenticationPage />,
        action: AuthenticationPage.action,
      },
      { path: "logout", action: logoutAction },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
