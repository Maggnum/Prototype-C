from pydantic import BaseModel
from typing import List, Tuple

class LatLng(BaseModel):
    lat: float
    lng: float

    def to_coordinates(self) -> Tuple[float, float]:
        return self.lat, self.lng

class DirectionsRequest(BaseModel):
    origin: LatLng
    destination: LatLng

class Polyline(BaseModel):
    coordinates: List[List[float]]
