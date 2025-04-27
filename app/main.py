from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.routers import hierarchy, views

description = """
# The Org - Interactive Organization Chart API

This API powers the interactive organization chart application that visualizes company hierarchies.

## Features

* **Hierarchical Data**: Retrieve complete organizational structure with reporting relationships
* **Employee Information**: Access details including names, positions, and salary information
* **Search Capabilities**: Find employees by name across the organization

## Endpoints

* `/data` - Returns the complete organizational hierarchy with all employee details
* `/names` - Returns a list of all employee names for search functionality

## Data Format

Employee data includes:
```json
{
    "id": "string",
    "parentId": "string",  // Reference to manager's ID (null for top-level)
    "name": "string",
    "position": "string",
    "salary": 0,
    "image": "string"  // URL to employee avatar
}
```
"""

tags_metadata = [
    {
        "name": "hierarchy",
        "description": "Operations related to the organizational hierarchy structure, including complete employee data and name listings",
    },
]

app = FastAPI(
    title="The Org API",
    description=description,
    summary="Interactive API for organizational hierarchy visualization",
    version="0.1.0",
    contact={
        "name": "RaphCodec",
        "url": "https://github.com/RaphCodec",
    },
    openapi_tags=tags_metadata,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["localhost"],
    allow_credentials=True,
    allow_methods=["GET"],
)

app.mount("/static", StaticFiles(directory="app/static"), name="static")

app.include_router(hierarchy.router)
app.include_router(views.router)
