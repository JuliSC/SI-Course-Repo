from fastapi import FastAPI

app = FastAPI(
  prefix="/api", 
  title="Spacecraft User API",
  description="An API to manage spacecrafts and users",
  version="0.0.1",
  terms_of_service="http://example.com/terms/",
  contact={
      "name": "Deadpoolio the Amazing",
      "url": "http://x-force.example.com/contact/",
      "email": "dp@x-force.example.com",
  },
  license_info={
      "name": "Apache 2.0",
      "url": "https://www.apache.org/licenses/LICENSE-2.0.html",
  },
)

# use spacecrafts_router.py
from routers import spacecrafts_router
from routers import users_router

app.include_router(spacecrafts_router, tags=["Spacecrafts"])
app.include_router(users_router, tags=["Users"])
