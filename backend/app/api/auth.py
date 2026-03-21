# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from passlib.context import CryptContext
# from pydantic import BaseModel
# import os

# from app.db.database import get_db
# from app.models.user import User
# from app.utils.security import create_access_token

# router = APIRouter(prefix="/auth", tags=["Auth"])

# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# # 🔥 SAME SECRET KEY (CONSISTENCY)
# SECRET_KEY = os.getenv("SECRET_KEY")


# class LoginRequest(BaseModel):
#     email: str
#     password: str


# @router.post("/login")
# def login(data: LoginRequest, db: Session = Depends(get_db)):

#     user = db.query(User).filter(User.email == data.email).first()

#     if not user:
#         raise HTTPException(status_code=401, detail="Invalid credentials")

#     if not pwd_context.verify(data.password, user.password_hash):
#         raise HTTPException(status_code=401, detail="Invalid credentials")

#     if not user.is_verified:
#         raise HTTPException(status_code=403, detail="Please verify your email")

#     # 🔥 token create (same key internally)
#     token = create_access_token({"user_id": str(user.id)})

#     return {
#         "access_token": token,
#         "token_type": "bearer"
#     }

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from pydantic import BaseModel
import os

from app.db.database import get_db
from app.models.user import User
from app.utils.security import create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = os.getenv("SECRET_KEY")


class LoginRequest(BaseModel):
    email: str
    password: str


@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.email == data.email).first()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not pwd_context.verify(data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not user.is_verified:
        raise HTTPException(status_code=403, detail="Please verify your email")

    token = create_access_token({
        "user_id": str(user.id),
        "role": user.role   # 🔥 ADD THIS (IMPORTANT)
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": user.role   # 🔥 FRONTEND साठी
    }