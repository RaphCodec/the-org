from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.routers import hierarchy, views

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['localhost'],
    allow_credentials=True,
    allow_methods=["GET"],
)

app.mount("/static", StaticFiles(directory="app/static"), name="static")

app.include_router(hierarchy.router)
app.include_router(views.router)