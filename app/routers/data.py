from fastapi import APIRouter, Request

from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse

import json

router = APIRouter(
    tags=["api"],
    responses={404: {"description": "Not found"}},
)


with open("app\data\dc.json", "r") as file:
    data = json.load(file)
    # Format salary values as US currency
    for item in data:
        if 'salary' in item:
            item['salary'] = "${:,.2f}".format(float(item['salary']))

    names = [item['name'] for item in data if 'name' in item]



templates = Jinja2Templates(directory="app/templates")


@router.get("/data", tags=["data"])
async def get_data():
    return JSONResponse(content=data)

@router.get("/names", tags=["names"])
async def get_names():
    return JSONResponse(content=names)

@router.get("/", tags=["home"])
async def get_dashboard(request: Request):
    try:
        return templates.TemplateResponse("index.html", {"request": request})
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": str(e)})