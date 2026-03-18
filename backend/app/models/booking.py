from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
import uuid
from app.models.base import Base


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), nullable=False)
    service_id = Column(UUID(as_uuid=True), ForeignKey("services.id"))
    technician_id = Column(UUID(as_uuid=True), ForeignKey("technicians.id"), nullable=True)

    address = Column(String)
    problem_description = Column(String)

    status = Column(String, default="pending")