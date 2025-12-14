import openrouteservice
from openrouteservice.directions import directions
from openrouteservice import convert

from core.config import settings
from models.schemas import DirectionsRequest, Polyline

client = openrouteservice.Client(key=settings.ORS_API_KEY)

def get_route(req: DirectionsRequest) -> Polyline:
    coordinates = (
        req.origin.to_coordinates(),
        req.destination.to_coordinates(),
    )

    geometry = directions(client, coordinates)['routes'][0]['geometry']
    decoded = convert.decode_polyline(geometry)

    return Polyline(coordinates=decoded["coordinates"])
