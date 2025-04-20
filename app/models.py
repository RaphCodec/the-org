from sqlmodel import Field, SQLModel

class heroes(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    parentId: int
    name: str
    position: str
    salary: float
    image: str
