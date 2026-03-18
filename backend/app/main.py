from fastapi import FastAPI
from sqlalchemy import text
from fastapi.middleware.cors import CORSMiddleware

from app.db.database import engine

from app.api import services
from app.api import users
from app.api import booking
from app.api import auth   # 👈 ADD THIS

app = FastAPI()

# ✅ CORS (frontend साठी future safe)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Routes
app.include_router(services.router)
app.include_router(users.router)
app.include_router(booking.router)
app.include_router(auth.router)   # 👈 ADD THIS

# ✅ Health check
@app.get("/")
def root():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT 1"))
        return {"database": result.scalar()}