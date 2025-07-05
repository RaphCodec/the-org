import os
from sqlmodel import create_engine, Session, SQLModel
from dotenv import load_dotenv

load_dotenv()

# Get MSSQL connection info from environment variables
MSSQL_SERVER = os.getenv("MSSQL_SERVER", "localhost")
MSSQL_DATABASE = os.getenv("MSSQL_DATABASE", "theOrg")

# Create connection string for MSSQL (using pyodbc driver)
connection_string = (
    f"mssql+pyodbc://@{MSSQL_SERVER}/{MSSQL_DATABASE}?driver=ODBC+Driver+17+for+SQL+Server&trusted_connection=yes"
)

# Create the engine and sessionmaker
engine = create_engine(connection_string)
SessionLocal = Session(autocommit=False, autoflush=False, bind=engine)

# This is a base class for our models
Base = SQLModel
