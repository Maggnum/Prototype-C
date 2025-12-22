import openrouteservice
from geojson import MultiPolygon
from openrouteservice import convert
from openrouteservice.directions import directions

from core.config import settings
from models.schemas import DirectionsRequest, DirectionsResponse

client = openrouteservice.Client(key=settings.ORS_API_KEY)


def get_route(req: DirectionsRequest) -> DirectionsResponse:
    coordinates = list(map(lambda x: x.to_lng_lat(), req.waypoints))

    avoidMultiPolygon = MultiPolygon(
        list(map(lambda feature: feature.geometry.coordinates, req.avoidPolygons)))
    print(avoidMultiPolygon)

    geometry = \
        directions(client, coordinates, optimize_waypoints=True, options={'avoid_polygons': avoidMultiPolygon})[
            "routes"][0]["geometry"]
    decoded = convert.decode_polyline(geometry)
    polyline = [[lat, lng] for lng, lat in decoded["coordinates"]]  # convert LngLat to LatLng

    return DirectionsResponse(polyline=polyline)
