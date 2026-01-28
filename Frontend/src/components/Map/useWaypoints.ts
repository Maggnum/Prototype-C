import { waypointsAtom } from "@/states";
import { useAtom } from "jotai";
import { LatLng } from "leaflet";

export const useWaypoints = () => {
  const [waypoints, setWaypoints] = useAtom(waypointsAtom);

  const setWaypoint = (index: number) => (position: LatLng) =>
    setWaypoints((prev) => {
      const newWaypoints = [...prev];
      newWaypoints[index] = position;
      return newWaypoints;
    });

  const getBetween = (first: LatLng, second: LatLng) =>
    new LatLng((first.lat + second.lat) / 2, (first.lng + second.lng) / 2);

  const addWaypoint = (index?: number) => {
    setWaypoints((prev) => {
      const newWaypoints = [...prev];
      if (index) {
        newWaypoints.splice(
          index + 1,
          0,
          getBetween(prev[index], prev[(index + 1) % prev.length])
        );
      } else {
        newWaypoints.push(new LatLng(31.4064, 34.8513));
      }
      return newWaypoints;
    });
  };

  const removeWaypoint = (index: number) => {
    setWaypoints((perv) => perv.filter((_, idx) => idx !== index));
  };

  return { waypoints, setWaypoint, addWaypoint, removeWaypoint };
};
