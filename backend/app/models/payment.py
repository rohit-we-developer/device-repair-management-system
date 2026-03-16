from sqlalchemy import Column, NUMERIC, String, TIMESTAMP, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid

from app.models.base import Base


class Payment(Base):
    __tablename__ = "payments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    booking_id = Column(UUID(as_uuid=True), ForeignKey("bookings.id"))

    amount = Column(NUMERIC(10,2), nullable=False)
    payment_method = Column(String(50))
    payment_status = Column(String(50))

    created_at = Column(TIMESTAMP, server_default=func.now())