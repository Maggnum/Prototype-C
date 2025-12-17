import { LatLng, Marker as MarkerType } from "leaflet";
import { useMemo, useRef, type FC } from "react";
import { Marker, Popup } from "react-leaflet";
import "leaflet.utm";
import "./marker.css";

interface CustomMarkerProps {
  title: string;
  position: LatLng;
  setPosition: React.Dispatch<React.SetStateAction<LatLng>>;
  onDrag?: () => void;
}

export const CustomMarker: FC<CustomMarkerProps> = ({
  title,
  position,
  setPosition,
  onDrag,
}) => {
  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition((marker as MarkerType).getLatLng());
        }

        onDrag?.();
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
