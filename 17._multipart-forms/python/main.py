from fastapi import FastAPI, Form, File, UploadFile
from fastapi.responses import HTMLResponse

app = FastAPI()

@app.post("/form")
def form_handler(username: str = Form(...), password: str = Form(..., min_length=8)):
    return {f'<h1>Username: {username}</h1>', f'<h1>Password: {password}</h1>'}

# @app.post("/fileform")
# def file_as_bytes_handler(file: bytes = File(...)):
#     print(file)
#     with open ("file", "wb") as f:
#         f.write(file)
#         f.close()
#     return {"message": "file uploaded"}

@app.post("/fileform")
async def file_as_file_handler(file: UploadFile = File(...), description: str = Form(...)):
    contens = await file.read()
    print(contens)
    print(description)
    return {"message": file.filename}
