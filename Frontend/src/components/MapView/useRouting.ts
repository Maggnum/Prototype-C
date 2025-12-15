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
        const result = await fetchRoute(
          routeRequest.origin,
          routeRequest.destination
        );
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
