import { markedPolygonIdAtom, avoidPolygonsAtom } from "@/states";
import { useAtom, useSetAtom } from "jotai";

export const usePolygonsControl = () => {
  const [polygons, setPolygons] = useAtom(avoidPolygonsAtom);
  const setMarkedPolygonId = useSetAtom(markedPolygonIdAtom);

  const deletePolygon = (idToRemove: string) => () => {
    setPolygons((prev) => prev.filter(({ id }) => id !== idToRemove));
  };

  const toPolygonFeature = (
    name: string,
    coords: Array<[number, number]>
  ): GeoJSON.Feature<GeoJSON.Polygon> => {
    const closedRing =
      coords.length > 0 &&
      (coords[0][0] !== coords.at(-1)?.[0] ||
        coords[0][1] !== coords.at(-1)?.[1])
        ? [...coords, coords[0]]
        : coords;

    return {
      id: crypto.randomUUID(),
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [closedRing],
      },
      properties: {
        name,
      },
    };
  };

  const addPolygon = (name: string, coordinates: Array<[number, number]>) =>
    setPolygons((prev) => [...prev, toPolygonFeature(name, coordinates)]);

  const editPolygonName = (index: number) => (name: string) =>
    setPolygons((prev) => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        properties: { ...copy[index].properties, name },
      };
      return copy;
    });

  const markPolygon = (id?: string) => {
    setMarkedPolygonId(id);
  };

  return { polygons, deletePolygon, addPolygon, editPolygonName, markPolygon };
};
