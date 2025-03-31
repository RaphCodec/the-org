from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
import json

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

with open("./data/dc.json", "r") as file:
    data = json.load(file)
    # Format salary values as US currency
    for item in data:
        if 'salary' in item:
            item['salary'] = "${:,.2f}".format(float(item['salary']))

app.add_middleware(
    CORSMiddleware,
    allow_origins=['localhost'],
    allow_credentials=True,
    allow_methods=["GET"],
)

templates = Jinja2Templates(directory="templates")


@app.get("/data", tags=["data"])
async def get_data():
    return JSONResponse(content=data)

@app.get("/", tags=["home"])
async def get_dashboard(request: Request):
    try:
        return templates.TemplateResponse("index.html", {"request": request})
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": str(e)})