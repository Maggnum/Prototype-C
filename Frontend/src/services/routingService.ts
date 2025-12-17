import axios from "axios";
import type { LatLng, LatLngExpression } from "leaflet";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: { "Content-Type": "application/json" },
});

export const fetchRoute = async (
  waypoints: LatLng[]
): Promise<LatLngExpression[]> => {
  const { data } = await api.post("/directions", { waypoints });

  return data.polyline;
};
