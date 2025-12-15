from fastapi import APIRouter, HTTPException
from models.schemas import DirectionsRequest, DirectionsResponse
from services.routing_service import get_route

router = APIRouter()

@router.post("/directions", response_model=DirectionsResponse)
def directions_endpoint(req: DirectionsRequest):
    try:
        return get_route(req)
    except Exception as e:
        return DirectionsResponse(polyline=[], message=str(e))
