import type { LatLng, LatLngExpression } from "leaflet";
import { useCallback, useEffect, useState } from "react";
import { fetchRoute } from "../../services";
import { toast } from "react-toastify";

type RouteRequest = {
  origin: LatLng;
  destination: LatLng;
} | null;

export const useRouting = () => {
  const [polyline, setPolyline] = useState<LatLngExpression[]>([]);
  const [routeRequest, setRouteRequest] = useState<RouteRequest>(null);
  const [loading, setLoading] = useState(false);

  const clearRoute = useCallback(() => {
    setPolyline([]);
    setRouteRequest(null);
    setLoading(false);
  }, []);

  const route = useCallback((origin: LatLng, destination: LatLng) => {
    setLoading(true);
    setRouteRequest({ origin, destination });
  }, []);

  useEffect(() => {
    if (!routeRequest) return;

    const fetchAndSetRoute = async () => {
      try {
        const routePromise = fetchRoute(
          routeRequest.origin,
          routeRequest.destination
        );

        toast.promise(
          routePromise,
          {
            pending: "Finding route...",
            success: "Route found!",
            error: "Error: ",
          },
          { position: "bottom-right" }
        );

        const result = await routePromise;

        setPolyline(result);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch route", error);
        setPolyline([]);
        setLoading(false);
      }
    };

    fetchAndSetRoute();
  }, [routeRequest]);

  return { polyline, clearRoute, route, loading };
};
