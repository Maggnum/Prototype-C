import "./mapView.css";
import "leaflet/dist/leaflet.css";

import { useState, type FC } from "react";
import { LatLng, type LatLngExpression, type PathOptions } from "leaflet";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import { CustomMarker } from "../Marker/marker";
import { useRouting } from "./useRouting";
import { Button } from "@mui/material";

const ISRAEL_COORDINATES: LatLngExpression = { lat: 31.4061, lng: 34.8516 };
const MAP_ZOOM = 8;

const PATH_OPTIONS: PathOptions = {
  color: "blue",
};

export const MapView: FC = () => {
  const [origin, setOrigin] = useState<LatLng>(new LatLng(31.4064, 34.8513));
  const [destination, setDestination] = useState<LatLng>(
    new LatLng(32.0771, 34.7844)
  );

  const { polyline, clearRoute, route } = useRouting();

  return (
    <>
      <MapContainer center={ISRAEL_COORDINATES} zoom={MAP_ZOOM}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
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
      <Button onClick={() => route(origin, destination)} variant="contained">
        Route
      </Button>
    </>
  );
};
