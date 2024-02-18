import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import { useEffect } from "react";
import { POST } from "../constants";
import { getTokenDuration } from "../utils";

export default function RootPage() {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: POST });
      return;
    }

    const tokenDuratuion = getTokenDuration();
    const timerId = setTimeout(() => {
      submit(null, { action: "/logout", method: POST });
    }, tokenDuratuion);

    return () => {
      clearTimeout(timerId);
    };
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}
