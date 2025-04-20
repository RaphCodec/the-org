from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from ..database import SessionLocal
from ..models import heroes

router = APIRouter(
    tags=["hierarchy"],
    responses={404: {"description": "Not found"}},
)


def get_db():
    db = SessionLocal
    try:
        yield db
    finally:
        db.close()


@router.get("/data", tags=["data"])
async def get_data(db: Session = Depends(get_db)):
    data = db.exec(select(heroes)).all()

    return data


@router.get("/names", tags=["names"])
async def get_names(db: Session = Depends(get_db)):
    names = db.exec(select(heroes.name)).all()

    return names
