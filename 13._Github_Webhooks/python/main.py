from fastapi import FastAPI, Request, Response

app = FastAPI()

@app.post("/githubwebhook")
async def githubwebhook(request: Request, response: Response):
    if request.headers.get("content-type") == "application/x-www-form-urlencoded":
        formData = await request.form()
        print(formData['payload'])
        response.status_code = 200
    else:
        response.status_code = 400
