import "./map.css";
import "leaflet/dist/leaflet.css";

import { type FC } from "react";
import { type LatLngExpression, type PathOptions } from "leaflet";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import { useTheme } from "@mui/material";
import { useAtom, useAtomValue } from "jotai";

import { CustomMarker } from "@/components/Marker";
import { chosenUrlAtom, destinationAtom, originAtom } from "@/states";
import { useRouting } from "./useRouting";

const ISRAEL_COORDINATES: LatLngExpression = { lat: 31.4, lng: 35.8216 };
const MAP_ZOOM = 8;

export const Map: FC = () => {
  const mapUrl = useAtomValue(chosenUrlAtom);

  const [origin, setOrigin] = useAtom(originAtom);
  const [destination, setDestination] = useAtom(destinationAtom);
  const { polyline, clearRoute } = useRouting();

  const { palette } = useTheme();
  const PATH_OPTIONS: PathOptions = {
    color: palette.primary.main,
  };

  return (
    <MapContainer center={ISRAEL_COORDINATES} zoom={MAP_ZOOM}>
      <TileLayer url={mapUrl} />
      <CustomMarker
        title="origin"
        position={origin}
        setPosition={setOrigin}
        onDrag={clearRoute}
      />
      <CustomMarker
        title="destination"
        position={destination}
        setPosition={setDestination}
        onDrag={clearRoute}
      />
      <Polyline positions={polyline} pathOptions={PATH_OPTIONS} />
    </MapContainer>
  );
};
