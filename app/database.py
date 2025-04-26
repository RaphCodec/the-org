import os
from sqlmodel import create_engine, Session, SQLModel
from dotenv import load_dotenv

load_dotenv()

SQLITE_DATABASE = os.getenv("SQLITE_DATABASE")

# Create connection string for SQLite (database in project root)
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
connection_string = f"sqlite:///{os.path.join(project_root, SQLITE_DATABASE)}"

# Create the engine and sessionmaker
engine = create_engine(connection_string, connect_args={"check_same_thread": False})
SessionLocal = Session(autocommit=False, autoflush=False, bind=engine)

# This is a base class for our models
Base = SQLModel
