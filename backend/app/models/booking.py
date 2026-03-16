from sqlalchemy import Column, TEXT, INTEGER, BOOLEAN, TIMESTAMP, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid

from app.models.base import Base


class Technician(Base):
    __tablename__ = "technicians"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    skills = Column(TEXT)
    experience_years = Column(INTEGER)
    available = Column(BOOLEAN, default=True)
    created_at = Column(TIMESTAMP, server_default=func.now())