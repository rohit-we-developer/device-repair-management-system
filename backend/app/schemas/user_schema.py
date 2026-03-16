from pydantic import BaseModel, EmailStr
from uuid import UUID
from datetime import datetime


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    password: str


class UserResponse(BaseModel):
    id: UUID
    name: str
    email: str
    phone: str
    role: str
    created_at: datetime

    class Config:
        from_attributes = True