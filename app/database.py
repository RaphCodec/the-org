import os
from sqlmodel import create_engine, Session, SQLModel
from dotenv import load_dotenv

load_dotenv()

SQL_SERVER = os.getenv("SQL_SERVER")
SQL_DATABASE = os.getenv("SQL_DATABASE")
# SQL_USER = os.getenv("SQL_USER")
# SQL_PASSWORD = os.getenv("SQL_PASSWORD")

# Create connection string for SQL Server
connection_string = f"mssql+pyodbc://@{SQL_SERVER}/{SQL_DATABASE}?driver=ODBC+Driver+17+for+SQL+Server&Trusted_Connection=yes"

# Create the engine and sessionmaker
engine = create_engine(connection_string)
SessionLocal = Session(autocommit=False, autoflush=False, bind=engine)

# This is a base class for our models
Base = SQLModel
