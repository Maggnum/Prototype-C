import type { LatLng, LatLngExpression } from "leaflet";
import { useCallback, useEffect, useState } from "react";
import { fetchRoute } from "../../services";

type RouteRequest = {
  origin: LatLng;
  destination: LatLng;
} | null;

export const useRouting = () => {
  const [polyline, setPolyline] = useState<LatLngExpression[]>([]);
  const [routeRequest, setRouteRequest] = useState<RouteRequest>(null);

  const clearRoute = useCallback(() => {
    setPolyline([]);
    setRouteRequest(null);
  }, []);

  const route = useCallback((origin: LatLng, destination: LatLng) => {
    setRouteRequest({ origin, destination });
  }, []);

  useEffect(() => {
    if (!routeRequest) return;

    const fetchAndSetRoute = async () => {
      try {
        const result = await fetchRoute(
          routeRequest.origin,
          routeRequest.destination
        );
        setPolyline(result);
      } catch (error) {
        console.error("Failed to fetch route", error);
        setPolyline([]);
      }
    };

    fetchAndSetRoute();
  }, [routeRequest]);

  return { polyline, clearRoute, route };
};
