from fastapi import FastAPI
from sqlalchemy import text
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv  # 🔥 ADD THIS

load_dotenv() 
from app.db.database import engine
from app.api import contact
from app.api import services
from app.api import users
from app.api import booking
from app.api import auth
from app.api import review   # 🔥 ADD THIS
from app.api import admin

app = FastAPI()

# ✅ CORS (frontend साठी future safe)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Routes
app.include_router(services.router)
app.include_router(users.router)
app.include_router(booking.router)
app.include_router(auth.router)
app.include_router(review.router, prefix="/reviews", tags=["Reviews"])  # 🔥 ADD THIS
app.include_router(admin.router, prefix="/admin", tags=["Admin"])
app.include_router(contact.router)
# ✅ Health check
@app.get("/")
def root():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT 1"))
        return {"database": result.scalar()}