import type { LatLng, LatLngExpression } from "leaflet";
import { useCallback, useEffect, useState } from "react";
import axios, { AxiosError, HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import { fetchRoute } from "@/services";

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
            error: {
              render({ data }) {
                if (axios.isAxiosError(data)) {
                  switch (data.response?.status) {
                    case HttpStatusCode.NotFound:
                      return "Route not found";
                    case HttpStatusCode.BadRequest:
                      return "Invalid user input";
                    case HttpStatusCode.InternalServerError:
                      return "Unexpected server error";
                    default:
                      return "Routing failed";
                  }
                }

                return "Unexpected error";
              },
            },
          },
          { position: "bottom-right" }
        );

        const result = await routePromise;

        setPolyline(result);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(
            error.response?.status,
            error.response?.data?.detail?.code,
            error.response?.data?.detail?.message
          );
        } else {
          console.error("Failed to fetch route", error);
        }
        setPolyline([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetRoute();
  }, [routeRequest]);

  return { polyline, clearRoute, route, loading };
};
