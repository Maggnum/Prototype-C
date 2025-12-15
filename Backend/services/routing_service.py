import openrouteservice
from openrouteservice.directions import directions
from openrouteservice import convert

from core.config import settings
from models.schemas import DirectionsRequest, DirectionsResponse

client = openrouteservice.Client(key=settings.ORS_API_KEY)

def get_route(req: DirectionsRequest) -> DirectionsResponse:
    try:
        coordinates = (
            req.origin.to_lng_lat(),
            req.destination.to_lng_lat(),
        )

        geometry = directions(client, coordinates)["routes"][0]["geometry"]
        decoded = convert.decode_polyline(geometry)
        polyline = [[lat, lng] for lng, lat in decoded["coordinates"]] # convert LngLat to LatLng

        return DirectionsResponse(polyline=polyline, message="got route successfully")
    except KeyError:
        raise Exception("KeyError")
