from typing import List, Tuple

from pydantic import BaseModel

from models.geoJSON import PolygonFeature


class LatLng(BaseModel):
    lat: float
    lng: float

    def to_lng_lat(self) -> Tuple[float, float]:
        return self.lng, self.lat  # openrouteservice uses LngLat


class DirectionsRequest(BaseModel):
    waypoints: List[LatLng]
    avoidPolygons: List[PolygonFeature]


class DirectionsResponse(BaseModel):
    polyline: List[List[float]]
