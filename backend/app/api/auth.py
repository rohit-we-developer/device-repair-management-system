# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from passlib.context import CryptContext

# from app.db.database import get_db
# from app.models.user import User
# from app.utils.security import create_access_token

# router = APIRouter(prefix="/auth", tags=["Auth"])

# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# @router.post("/login")
# def login(email: str, password: str, db: Session = Depends(get_db)):

#     user = db.query(User).filter(User.email == email).first()

#     # ❌ user नाही
#     if not user:
#         raise HTTPException(status_code=401, detail="Invalid credentials")

#     # ❌ password match नाही (bcrypt verify)
#     if not pwd_context.verify(password, user.password_hash):
#         raise HTTPException(status_code=401, detail="Invalid credentials")

#     token = create_access_token({"user_id": str(user.id)})

#     return {"access_token": token}

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from pydantic import BaseModel

from app.db.database import get_db
from app.models.user import User
from app.utils.security import create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# 🔥 LOGIN REQUEST SCHEMA
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

    token = create_access_token({"user_id": str(user.id)})

    return {
        "access_token": token,
        "token_type": "bearer"
    }