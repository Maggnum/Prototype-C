import "@geoman-io/leaflet-geoman-free";
import { mapModeAtom, avoidPolygonsAtom } from "@/states";
import { useAtom } from "jotai";
import { useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { MapMode } from "@/models";
import { Layer, Polygon as leafletPolygon } from "leaflet";

export const useGeoMan = () => {
  const map = useMap();
  const [polygons, setPolygons] = useAtom(avoidPolygonsAtom);
  const [mapMode, setMapMode] = useAtom(mapModeAtom);
  const [lastMode, setLastMode] = useState<MapMode>(MapMode.DEAFULT);

  // Map mode switch
  useEffect(() => {
    const resetMode = () => {
      switch (lastMode) {
        case MapMode.DEAFULT:
          break;
        case MapMode.DRAW:
          map.pm.disableDraw();
          break;
        case MapMode.DELETE:
          map.pm.disableGlobalRemovalMode();
          break;
        default:
          break;
      }
      setLastMode(mapMode);
    };

    switch (mapMode) {
      case MapMode.DEAFULT:
        resetMode();
        break;
      case MapMode.DRAW:
        resetMode();
        map.pm.enableDraw("Polygon");
        break;
      case MapMode.DELETE:
        resetMode();
        map.pm.enableGlobalRemovalMode();
        break;
      default:
        break;
    }
  }, [map, mapMode]);

  // GeoMap events
  useEffect(() => {
    const onCreate = ({ layer }: { layer: Layer }) => {
      layer.removeFrom(map);

      const feature = (layer as leafletPolygon).toGeoJSON();
      feature.id = crypto.randomUUID();
      feature.properties.name = feature.id.slice(-16);
      setPolygons((prev) => [...prev, feature]);

      setMapMode(MapMode.DEAFULT);
    };

    const onDelete = ({ layer }: { layer: Layer }) => {
      layer.addTo(map);

      const idToRemove = (layer as leafletPolygon).toGeoJSON()?.id;
      setPolygons((prev) => prev.filter(({ id }) => id !== idToRemove));

      setMapMode(MapMode.DEAFULT);
    };

    map.on("pm:create", onCreate);
    map.on("pm:remove", onDelete);

    return () => {
      map.off("pm:create", onCreate);
      map.off("pm:remove", onDelete);
    };
  }, [map]);

  return { polygons };
};
