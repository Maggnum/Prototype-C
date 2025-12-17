import { toastRoute } from "@/utils/toast";
import { fetchRoute } from "@/services";
import mapProviders from "@/config/mapProviders.json";
import { atom } from "jotai";
import { loadable } from "jotai/utils";
import { LatLng, type LatLngExpression } from "leaflet";

export const chosenUrlAtom = atom(mapProviders[0].url);
export const waypointsAtom = atom<LatLng[]>([
  new LatLng(31.4064, 34.8513),
  new LatLng(31.7621, 34.9474),
  new LatLng(32.0771, 34.7844),
]);
export const displayRouteAtom = atom(false);

const asyncRouteAtom2 = atom<Promise<LatLngExpression[]>>(async (get) => {
  if (get(displayRouteAtom) && get(waypointsAtom).length > 1) {
    const promise = fetchRoute(get(waypointsAtom));
    toastRoute(promise);
    return promise;
  }
  return [];
});

export const routeAtom = loadable(asyncRouteAtom2);
