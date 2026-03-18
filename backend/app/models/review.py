from sqlalchemy import Column, Integer, Text, TIMESTAMP, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid

from app.models.base import Base


class Review(Base):
    __tablename__ = "reviews"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    booking_id = Column(UUID(as_uuid=True), ForeignKey("bookings.id"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)

    rating = Column(Integer, nullable=False)
    comment = Column(Text, nullable=True)

    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())