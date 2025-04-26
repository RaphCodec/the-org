from sqlmodel import Field, SQLModel

class heroes(SQLModel, table=True):
    id: str = Field(default=None, primary_key=True)
    parentId: str
    name: str
    position: str
    salary: float
    image: str
