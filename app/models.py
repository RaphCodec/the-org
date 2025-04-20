from sqlmodel import Field, SQLModel

class heros(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    ParentId: int
    Name: str
    Position: str
    Salary: float
    Image: str
