from fastapi import APIRouter, Request

from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse

router = APIRouter(
    tags=["home"],
    responses={404: {"description": "Not found"}},
)

templates = Jinja2Templates(directory="app/templates")

@router.get("/", tags=["home"])
async def get_dashboard(request: Request):
    try:
        return templates.TemplateResponse("index.html", {"request": request})
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": str(e)})