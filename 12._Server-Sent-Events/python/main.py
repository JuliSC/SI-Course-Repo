from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
import asyncio
from datetime import datetime

from sse_starlette.sse import EventSourceResponse

templates = Jinja2Templates(directory="templates")

app = FastAPI()

@app.get("/")
def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


STREAM_DELAY = 1  # seconds
RETRY_TIMEOUT = 1000  # milliseconds

@app.get("/sync-time")
async def sync_time(request: Request):
  def new_messages():
    # Add logic here to check for new messages
    yield 'Hello World'
  async def event_generator():
    while True:
        # If client closes connection, stop sending events
        if await request.is_disconnected():
            break

        # Checks for new messages and return them to client if any
        if new_messages():
            yield {
                    "event": "new_message",
                    "id": "message_id",
                    "retry": RETRY_TIMEOUT,
                    "data": datetime.now().isoformat(),
            }

        await asyncio.sleep(STREAM_DELAY)

  return EventSourceResponse(event_generator())