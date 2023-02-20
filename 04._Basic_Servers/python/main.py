from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return ("wow", "such", "amaze")

@app.get("/about")
def read_about():
    return {"about": "me"}