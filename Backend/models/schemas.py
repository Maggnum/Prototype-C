from pydantic import BaseModel
from typing import List, Tuple

class LatLng(BaseModel):
    lat: float
    lng: float

    def to_lng_lat(self) -> Tuple[float, float]:
        return self.lng, self.lat #openrouteservice uses LngLat

class DirectionsRequest(BaseModel):
    origin: LatLng
    destination: LatLng

class DirectionsResponse(BaseModel):
    polyline: List[List[float]]