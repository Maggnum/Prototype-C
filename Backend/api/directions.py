from fastapi import APIRouter
from models.schemas import DirectionsRequest, Polyline
from services.routing_service import get_route

router = APIRouter()

@router.get("/directions", response_model=Polyline)
def directions_endpoint(req: DirectionsRequest):
    return get_route(req)
