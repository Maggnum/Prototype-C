import "./mapView.css";
import "leaflet/dist/leaflet.css";

import { useState, type FC } from "react";
import { LatLng, type LatLngExpression, type PathOptions } from "leaflet";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import { CustomMarker } from "../Marker/marker";
import { useRouting } from "./useRouting";
import { Button, type SxProps } from "@mui/material";

const ISRAEL_COORDINATES: LatLngExpression = { lat: 31.4061, lng: 34.8516 };
const MAP_ZOOM = 8;

const PATH_OPTIONS: PathOptions = {
  color: "blue",
};

const buttonStyle: SxProps = {
  textTransform: "none",
  fontWeight: 500,
  fontSize: "1.3rem",
  px: 6,
  py: 1,
  borderRadius: "10px",
  backgroundColor: "#f0991a",
  boxShadow: "0 4px 12px rgba(255,255,255,0.25)",
  "&:hover": {
    backgroundColor: "#9b6311",
    boxShadow: "0 6px 16px rgba(255,255,255,0.35)",
  },
};

export const MapView: FC = () => {
  const [origin, setOrigin] = useState<LatLng>(new LatLng(31.4064, 34.8513));
  const [destination, setDestination] = useState<LatLng>(
    new LatLng(32.0771, 34.7844)
  );

  const { polyline, clearRoute, route, loading } = useRouting();

  return (
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
      <Button
        onClick={() => route(origin, destination)}
        sx={buttonStyle}
        variant="contained"
        className="route-button"
        disabled={loading}
      >
        Route
      </Button>
    </MapContainer>
  );
};
