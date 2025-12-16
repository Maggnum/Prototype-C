import { routeAtom, displayRouteAtom } from "@/states";
import { AxiosError } from "axios";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

export const useRouting = () => {
  const routeLoadable = useAtomValue(routeAtom);
  const displayRoute = useSetAtom(displayRouteAtom);

  const route = () => displayRoute(true);
  const clearRoute = () => displayRoute(false);

  useEffect(() => {
    if (routeLoadable.state === "hasError") {
      const error = routeLoadable.error;
      if (error instanceof AxiosError) {
        console.error(
          error.response?.status,
          error.response?.data?.detail?.code,
          error.response?.data?.detail?.message
        );
      } else {
        console.error("Failed to fetch route", error);
      }
      displayRoute(false);
    }
  }, [routeLoadable, displayRoute]);

  return {
    polyline: routeLoadable.state === "hasData" ? routeLoadable.data : [],
    loading: routeLoadable.state === "loading",
    route,
    clearRoute,
  };
};
