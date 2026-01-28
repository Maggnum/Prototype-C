import { LatLng, Marker as MarkerType } from "leaflet";
import { useMemo, useRef, type FC } from "react";
import { Marker, Popup } from "react-leaflet";
import { createMarkerIcon } from "./markerIcon";
import "leaflet.utm";
import "./marker.css";
import { useTheme } from "@mui/material";

interface CustomMarkerProps {
  title: string;
  position: LatLng;
  setPosition: (position: LatLng) => void;
  onDrag?: () => void;
}

export const CustomMarker: FC<CustomMarkerProps> = ({
  title,
  position,
  setPosition,
  onDrag,
}) => {
  const { palette } = useTheme();
  const icon = createMarkerIcon(palette.primary.main);

  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        onDrag?.();
        const marker = markerRef.current;
        if (marker != null) {
          setPosition((marker as MarkerType).getLatLng());
        }
      },
    }),
    [setPosition, onDrag]
  );

  return (
    <Marker
      draggable={true}
      position={position}
      eventHandlers={eventHandlers}
      ref={markerRef}
      icon={icon}
    >
      <Popup className="custom-popup">
        <h3 className="popup-title">{title}</h3>
        <div className="popup-content">
          <strong>lat: </strong> {position.lat}
          <br />
          <strong>lng: </strong> {position.lng}
          <br />
          <strong>utm: </strong> {position.utm().toString()}
        </div>
      </Popup>
    </Marker>
  );
};
