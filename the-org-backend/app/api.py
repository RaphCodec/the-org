from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

origins = [
    "http://localhost:5173",
    "localhost:5173",
]

with open("./data/dc.json", "r") as file:
    data = json.load(file)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": 'Welcome to The Org API'}

@app.get("/data", tags=["data"])
async def get_todos() -> list:
    return data
