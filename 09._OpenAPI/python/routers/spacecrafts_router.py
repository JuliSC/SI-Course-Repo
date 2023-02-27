from typing import Union
from fastapi import APIRouter, Query
from pydantic import BaseModel

router = APIRouter()

spacecrafts = [
    {"id": 1, "name": "Crew Dragon"},
    {"id": 2, "name": "Starliner"},
    {"id": 3, "name": "Falcon 9"},
    {"id": 4, "name": "Falcon Heavy"},
]

class Spacecraft(BaseModel):
    id: int
    name: str

@router.get("/spacecrafts", response_model=list[Spacecraft])
async def get_spacecrafts():
    return spacecrafts


@router.get("/spacecrafts/{spacecraft_id}", response_model=Spacecraft)
async def get_spacecraft(spacecraft_id: int, show_id: Union[str, None] = Query("Default", max_length=50)):
    for spacecraft in spacecrafts:
        if spacecraft["id"] == spacecraft_id:
            if show_id != "Default":
                return {"name": spacecraft["name"]}
            return spacecraft
    return {"error": "Spacecraft not found"}

@router.post("/spacecrafts")
async def add_spacecraft(spacecraft: Spacecraft):
    spacecrafts.append(spacecraft)
    return spacecraft