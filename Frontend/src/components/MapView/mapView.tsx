import "./mapView.css";
import "leaflet/dist/leaflet.css";

import type { FC } from "react";
import type { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";

const ISRAEL_COORDINATES: LatLngExpression = { lat: 31.4061, lng: 34.8516 };
const MAP_ZOOM = 8;

export const MapView: FC = () => {
  return (
    <MapContainer center={ISRAEL_COORDINATES} zoom={MAP_ZOOM}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};
