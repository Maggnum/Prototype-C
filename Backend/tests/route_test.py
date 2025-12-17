from typing import List

from models.schemas import DirectionsRequest, LatLng, DirectionsResponse
from services.routing_service import get_route


def check_result_type(result: DirectionsResponse):
    assert hasattr(result, 'polyline')
    assert isinstance(result.polyline, list)
    assert all(
        isinstance(point, list) and len(point) == 2
        for point in result.polyline
    )


def test_2_waypoints():
    request = DirectionsRequest(
        waypoints=[
            LatLng(lat=31.406400, lng=34.851300),
            LatLng(lat=31.762100, lng=34.947400),
        ]
    )

    result = get_route(request)
    check_result_type(result)


def test_3_waypoints():
    request = DirectionsRequest(
        waypoints=[
            LatLng(lat=31.406400, lng=34.851300),
            LatLng(lat=31.762100, lng=34.947400),
            LatLng(lat=32.077100, lng=34.784400),
        ]
    )

    result = get_route(request)
    check_result_type(result)