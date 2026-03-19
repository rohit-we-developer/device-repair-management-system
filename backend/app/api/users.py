from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from datetime import datetime, timedelta
import jwt

from app.db.database import get_db
from app.models.user import User
from app.schemas.user_schema import UserCreate, UserResponse
from app.utils.email import send_verification_email

router = APIRouter(prefix="/users", tags=["Users"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "supersecretkey"


# 🔥 REGISTER (NO DB INSERT)
@router.post("/register")
def register_user(data: UserCreate):

    payload = {
        "name": data.name,
        "email": data.email,
        "phone": data.phone,
        "password": data.password,
        "exp": datetime.utcnow() + timedelta(minutes=10)
    }

    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")

    send_verification_email(data.email, token)

    return {"message": "Please verify your email first"}


# 🔥 VERIFY EMAIL (HIDDEN FROM SWAGGER)
@router.get("/verify-email", include_in_schema=False)
def verify_email(token: str, db: Session = Depends(get_db)):

    try:
        data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    except:
        raise HTTPException(status_code=400, detail="Invalid or expired token")

    # ❌ duplicate check
    existing = db.query(User).filter(User.email == data["email"]).first()
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_password = pwd_context.hash(data["password"])

    new_user = User(
        name=data["name"],
        email=data["email"],
        phone=data["phone"],
        password_hash=hashed_password,
        is_verified=True
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "Email verified & account created successfully",
        "user": UserResponse.model_validate(new_user)
    }