from pydantic import BaseModel
from uuid import UUID
from datetime import datetime


# 🔹 BASE
class ServiceBase(BaseModel):
    title: str
    description: str
    price: float
    estimated_time: int


# 🔹 CREATE
class ServiceCreate(ServiceBase):
    pass


# 🔹 RESPONSE
class ServiceResponse(ServiceBase):
    id: UUID
    is_active: bool   # 🔥 NEW FIELD (IMPORTANT)
    created_at: datetime

    class Config:
        from_attributes = True