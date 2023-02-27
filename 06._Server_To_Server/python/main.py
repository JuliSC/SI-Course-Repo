from fastapi import FastAPI
from datetime import datetime
import requests

app = FastAPI()

@app.get("/")
async def root():
  return {"message": "Hello World"}

@app.get("/date")
async def date():
  return datetime.now()

@app.get("/datefromnode")
async def datefromnode():
  print("oof")
  # use requests to call the node server
  response = requests.get("https://cf5b-195-249-146-100.eu.ngrok.io/date")
  return response