from app.db.database import SessionLocal
from app.models.user import User
from app.models.service import Service
from app.models.booking import Booking
from app.models.technician import Technician

from passlib.context import CryptContext
from datetime import datetime
import uuid
import random

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

db = SessionLocal()


def seed():
    print("⚡ Seeding started...")

    # ✅ ADMIN CHECK (INSIDE FUNCTION)
    existing_admin = db.query(User).filter(
        User.email == "rwagh0450@gmail.com"
    ).first()

    if not existing_admin:
        admin = User(
            id=uuid.uuid4(),
            name="Rohit",
            email="rwagh0450@gmail.com",
            phone="9999999999",
            password_hash=pwd_context.hash("Rohit@321"),
            role="admin",
            is_verified=True
        )
        db.add(admin)
        db.commit()
        db.refresh(admin)
    else:
        admin = existing_admin

    # ✅ SERVICES (duplicate avoid)
    existing_services = db.query(Service).all()

    if not existing_services:
        s1 = Service(
            id=uuid.uuid4(),
            title="Screen Repair",
            description="Fix broken screen",
            price=2000,
            estimated_time=2,
            is_active=True
        )

        s2 = Service(
            id=uuid.uuid4(),
            title="Battery Replacement",
            description="Replace battery",
            price=1500,
            estimated_time=1,
            is_active=True
        )

        db.add_all([s1, s2])
        db.commit()
        db.refresh(s1)
        db.refresh(s2)
    else:
        s1, s2 = existing_services[:2]

    # ✅ MULTIPLE TECHNICIANS (IMPORTANT)
    existing_techs = db.query(Technician).all()

    if not existing_techs:
        technicians = []
        for i in range(10):
            tech = Technician(
                id=uuid.uuid4(),
                skills=f"Laptop Repair {i+1}",
                available=True,
                experience_years=2 + i
            )
            technicians.append(tech)

        db.add_all(technicians)
        db.commit()
    else:
        technicians = existing_techs

    # ✅ BOOKINGS (ONLY IF EMPTY)
    existing_bookings = db.query(Booking).all()

    if not existing_bookings:
        bookings = [
            Booking(
                id=uuid.uuid4(),
                user_id=admin.id,
                service_id=s1.id,
                technician_id=random.choice(technicians).id,
                address="Pune",
                status="completed",
                created_at=datetime(2026, 1, 10)
            ),
            Booking(
                id=uuid.uuid4(),
                user_id=admin.id,
                service_id=s2.id,
                technician_id=random.choice(technicians).id,
                address="Mumbai",
                status="completed",
                created_at=datetime(2026, 2, 15)
            ),
            Booking(
                id=uuid.uuid4(),
                user_id=admin.id,
                service_id=s1.id,
                technician_id=random.choice(technicians).id,
                address="Delhi",
                status="in_progress",
                created_at=datetime(2026, 3, 1)
            ),
            Booking(
                id=uuid.uuid4(),
                user_id=admin.id,
                service_id=s2.id,
                technician_id=random.choice(technicians).id,
                address="Pune",
                status="assigned",
                created_at=datetime(2026, 3, 5)
            ),
        ]

        db.add_all(bookings)
        db.commit()

    db.close()
    print("🔥 SEED DONE — DATA READY")


if __name__ == "__main__":
    seed()