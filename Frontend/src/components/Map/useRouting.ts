import {
  avoidPolygonsAtom,
  routeAtom,
  routeRequestParamsAtom,
  waypointsAtom,
} from "@/states";
import { AxiosError } from "axios";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

export const useRouting = () => {
  const routeLoadable = useAtomValue(routeAtom);
  const setRouteRequestParams = useSetAtom(routeRequestParamsAtom);
  const waypoints = useAtomValue(waypointsAtom);
  const avoidPolygons = useAtomValue(avoidPolygonsAtom);

  const route = () => setRouteRequestParams({ waypoints, avoidPolygons });
  const clearRoute = () => setRouteRequestParams(null);

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
    }
  }, [routeLoadable]);

  return {
    polyline: routeLoadable.state === "hasData" ? routeLoadable.data : [],
    loading: routeLoadable.state === "loading",
    route,
    clearRoute,
  };
};
