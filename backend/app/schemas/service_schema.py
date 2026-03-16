from pydantic import BaseModel
from uuid import UUID
from datetime import datetime


class ServiceCreate(BaseModel):
    title: str
    description: str
    price: float
    estimated_time: int


class ServiceResponse(BaseModel):
    id: UUID
    title: str
    description: str
    price: float
    estimated_time: int
    created_at: datetime

    class Config:
        from_attributes = True