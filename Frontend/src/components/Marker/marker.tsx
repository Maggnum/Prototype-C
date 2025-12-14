import { LatLng, Marker as MarkerType } from "leaflet";
import { useMemo, useRef, useState, type FC } from "react";
import { Marker, Popup } from "react-leaflet";
import "leaflet.utm";
import "./marker.css";

interface CustomMarkerProps {
  title: string;
  initialPosition: LatLng;
}

export const CustomMarker: FC<CustomMarkerProps> = ({
  title,
  initialPosition,
}) => {
  const [position, setPosition] = useState<LatLng>(initialPosition);
  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition((marker as MarkerType).getLatLng());
        }
      },
    }),
    []
  );

  return (
    <Marker
      draggable={true}
      position={position}
      eventHandlers={eventHandlers}
      ref={markerRef}
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
