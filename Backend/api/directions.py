from fastapi import APIRouter, HTTPException
from openrouteservice.exceptions import ApiError

from models.schemas import DirectionsRequest, DirectionsResponse
from services.routing_service import get_route

router = APIRouter()

@router.post("/directions", response_model=DirectionsResponse)
def directions_endpoint(req: DirectionsRequest):
    try:
        route = get_route(req)
        return route
    except ApiError as e:

        raise HTTPException(
            status_code=e.args[0],
            detail={
                "code": e.args[1]["error"]["code"],
                "message": e.args[1]["error"]["message"],
            },
        )

    except Exception:
        raise HTTPException(
            status_code=500,
            detail={"message": "Internal routing error"},
        )
