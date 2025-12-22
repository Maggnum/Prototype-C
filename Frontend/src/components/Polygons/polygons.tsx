import { useTheme } from "@mui/material";
import type { PathOptions } from "leaflet";
import type { FC } from "react";
import { GeoJSON } from "react-leaflet";
import { useGeoMan } from "./useGeoMan";
import { useAtomValue } from "jotai";
import { markedPolygonIdAtom } from "@/states";

export const Polygons: FC = () => {
  const { polygons } = useGeoMan();
  const markedPolygonId = useAtomValue(markedPolygonIdAtom);
  const { palette } = useTheme();
  const POLYGON_OPTIONS: PathOptions = {
    color: palette.error.main,
  };

  const MARKED_OPTIONS: PathOptions = {
    color: palette.error.light,
  };

  return polygons.map((polygon) => (
    <GeoJSON
      key={polygon.id}
      data={polygon}
      pathOptions={
        polygon.id === markedPolygonId ? MARKED_OPTIONS : POLYGON_OPTIONS
      }
    />
  ));
};
