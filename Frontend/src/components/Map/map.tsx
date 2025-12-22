import "./map.css";
import "leaflet/dist/leaflet.css";

import { type FC } from "react";
import { type LatLngExpression, type PathOptions } from "leaflet";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import { useTheme } from "@mui/material";
import { useAtomValue } from "jotai";

import { CustomMarker } from "@/components/Marker";
import { chosenUrlAtom } from "@/states";
import { useRouting } from "./useRouting";
import { useWaypoints } from "@/components/Waypoints";

const ISRAEL_COORDINATES: LatLngExpression = { lat: 31.4, lng: 35.8216 };
const MAP_ZOOM = 8;

export const Map: FC = () => {
  const mapUrl = useAtomValue(chosenUrlAtom);

  const { waypoints, setWaypoint } = useWaypoints();
  const { polyline, clearRoute } = useRouting();

  const { palette } = useTheme();
  const ROUTE_OPTIONS: PathOptions = {
    color: palette.primary.main,
  };

  return (
    <MapContainer center={ISRAEL_COORDINATES} zoom={MAP_ZOOM}>
      <TileLayer url={mapUrl} />
      {waypoints.map((waypoint, index) => (
        <CustomMarker
          key={index}
          title={`#${index + 1}`}
          position={waypoint}
          setPosition={setWaypoint(index)}
          onDrag={clearRoute}
        />
      ))}
      <Polyline positions={polyline} pathOptions={ROUTE_OPTIONS} />
    </MapContainer>
  );
};
