from pydantic import BaseModel
from uuid import UUID


class ReviewCreate(BaseModel):
    booking_id: UUID
    rating: int
    comment: str


class ReviewResponse(BaseModel):
    id: UUID
    booking_id: UUID
    user_id: UUID
    rating: int
    comment: str

    class Config:
        from_attributes = True