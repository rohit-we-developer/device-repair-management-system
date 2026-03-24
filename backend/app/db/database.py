from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os

# 🔥 Load env
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# 🔥 Engine
engine = create_engine(DATABASE_URL)

# 🔥 Session
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# 🔥 THIS IS THE MOST IMPORTANT (MISSING)
Base = declarative_base()

# 🔥 Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()