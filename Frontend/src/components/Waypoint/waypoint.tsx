import { LatLng, Marker as LeafletMarker } from "leaflet";
import { useMemo, useRef, useState, type FC } from "react";
import { Marker, Popup } from "react-leaflet";
import "leaflet.utm";
import "./marker.css";

interface WaypointProps {
  title: string;
  initialPosition: LatLng;
}

export const Waypoint: FC<WaypointProps> = ({ title, initialPosition }) => {
  const [position, setPosition] = useState<LatLng>(initialPosition);
  const waypointRef = useRef<LeafletMarker>(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const waypoint = waypointRef.current;
        if (waypoint != null) {
          setPosition(waypoint.getLatLng());
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
      ref={waypointRef}
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
