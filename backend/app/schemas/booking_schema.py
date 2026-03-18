from pydantic import BaseModel
from uuid import UUID


class BookingCreate(BaseModel):
    user_id: UUID
    service_id: UUID
    address: str
    problem_description: str


class BookingResponse(BaseModel):
    id: UUID
    user_id: UUID
    service_id: UUID
    technician_id: UUID | None
    address: str
    problem_description: str
    status: str

    class Config:
        from_attributes = True