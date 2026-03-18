from sqlalchemy import Column, TEXT, BOOLEAN
from sqlalchemy.dialects.postgresql import UUID
import uuid

from app.models.base import Base


class Technician(Base):
    __tablename__ = "technicians"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    skills = Column(TEXT)
    available = Column(BOOLEAN, default=True)