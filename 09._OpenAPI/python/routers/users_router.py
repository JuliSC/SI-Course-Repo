from typing import Union
from fastapi import APIRouter, Query
from pydantic import BaseModel

router = APIRouter()

users = [
    {"id": 1, "name": "John Doe"},
    {"id": 2, "name": "Jane Doe"},
    {"id": 3, "name": "John Smith"},
    {"id": 4, "name": "Jane Smith"},
]

class User(BaseModel):
    id: int
    name: str

@router.get("/users", response_model=list[User])
async def get_users():
    return users

@router.get("/users/{user_id}", response_model=User)
async def get_user(user_id: int, show_id: Union[str, None] = Query("Default", max_length=50)):
    for user in users:
        if user["id"] == user_id:
            if show_id != "Default":
                return {"name": user["name"]}
            return user
    return {"error": "User not found"}

@router.post("/users")
async def add_user(user: User):
    users.append(user)
    return user