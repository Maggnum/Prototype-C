from typing import List, Tuple
from pydantic import BaseModel, Field

Position = Tuple[float, float]  # [lng, lat]
LinearRing = List[Position]
PolygonCoordinates = List[LinearRing]


class PolygonGeometry(BaseModel):
    type: str = Field("Polygon")
    coordinates: PolygonCoordinates


class PolygonFeature(BaseModel):
    type: str = Field("Feature")
    id: str | None = None
    geometry: PolygonGeometry
    properties: dict = Field(default_factory=dict)
