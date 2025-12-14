from fastapi import FastAPI
from api.directions import router as directions_router

app = FastAPI()
app.include_router(directions_router)