# from sqlalchemy import Column, String, TIMESTAMP
# from sqlalchemy.dialects.postgresql import UUID
# from sqlalchemy.sql import func
# import uuid

# from app.models.base import Base


# class User(Base):
#     __tablename__ = "users"

#     id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
#     name = Column(String(100), nullable=False)
#     email = Column(String(150), unique=True, nullable=False)
#     phone = Column(String(20))
#     password_hash = Column(String, nullable=False)
#     role = Column(String(20), default="user")
#     created_at = Column(TIMESTAMP, server_default=func.now())

from sqlalchemy import Column, String, TIMESTAMP, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid

from app.models.base import Base


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    phone = Column(String(20))
    password_hash = Column(String, nullable=False)

    role = Column(String(20), default="user")

    # 🔥 EMAIL VERIFICATION
    is_verified = Column(Boolean, default=False)
    verification_token = Column(String, nullable=True)

    created_at = Column(TIMESTAMP, server_default=func.now())