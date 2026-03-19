from pydantic import BaseModel, EmailStr, Field
from uuid import UUID
from datetime import datetime


# 🔥 REGISTER
class UserCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=15)
    password: str = Field(..., min_length=6)


# 🔥 LOGIN
class UserLogin(BaseModel):
    email: EmailStr
    password: str


# 🔥 RESPONSE
class UserResponse(BaseModel):
    id: UUID
    name: str
    email: str
    phone: str
    role: str
    created_at: datetime

    class Config:
        from_attributes = True