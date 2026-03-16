from sqlalchemy import Column, INTEGER, TEXT, TIMESTAMP, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid

from app.models.base import Base


class Review(Base):
    __tablename__ = "reviews"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    booking_id = Column(UUID(as_uuid=True), ForeignKey("bookings.id"))
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))

    rating = Column(INTEGER)
    comment = Column(TEXT)

    created_at = Column(TIMESTAMP, server_default=func.now())