import { toastRoute } from "@/utils/toast";
import { fetchRoute } from "@/services";
import mapProviders from "@/config/mapProviders.json";
import { atom } from "jotai";
import { loadable } from "jotai/utils";
import { LatLng, type LatLngExpression } from "leaflet";
import { MapMode } from "@/models";

export const chosenUrlAtom = atom(mapProviders[0].url);
export const mapModeAtom = atom<MapMode>(MapMode.DEAFULT);
export const avoidPolygonsAtom = atom<Array<GeoJSON.Feature>>([]);
export const markedPolygonIdAtom = atom<string | undefined>();
export const waypointsAtom = atom<Array<LatLng>>([
  new LatLng(31.3762, 34.8649),
  new LatLng(31.6627, 35.155),
  new LatLng(32.0745, 34.7851),
]);

export const routeRequestParamsAtom = atom<{
  waypoints: Array<LatLng>;
  avoidPolygons: Array<GeoJSON.Feature>;
} | null>(null);

const asyncRouteAtom2 = atom<Promise<Array<LatLngExpression>>>(async (get) => {
  const params = get(routeRequestParamsAtom);

  if (!params || params.waypoints.length < 2) return [];

  const promise = fetchRoute(params.waypoints, params.avoidPolygons);
  toastRoute(promise);
  return promise;
});

export const routeAtom = loadable(asyncRouteAtom2);
