from fastapi import FastAPI
from sqlalchemy import text
from app.db.database import engine

from app.api import services
from app.api import users

app = FastAPI()

app.include_router(services.router)
app.include_router(users.router)

@app.get("/")
def root():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT 1"))
        return {"database": result.scalar()}