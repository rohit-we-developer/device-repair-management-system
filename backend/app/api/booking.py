from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from jose import jwt

from app.db.database import get_db
from app.models.booking import Booking
from app.models.service import Service
from app.models.technician import Technician
from app.schemas.booking_schema import BookingCreate

router = APIRouter()

SECRET_KEY = "mysecretkey"
ALGORITHM = "HS256"

security = HTTPBearer()


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload["user_id"]
    except:
        raise HTTPException(status_code=401, detail="Invalid token")


# 🔒 CREATE BOOKING
@router.post("/")
def create_booking(
    data: BookingCreate,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user)
):
    service = db.query(Service).filter(Service.id == data.service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")

    technician = db.query(Technician).filter(Technician.available == True).first()
    if not technician:
        raise HTTPException(status_code=404, detail="No technician available")

    booking = Booking(
        service_id=data.service_id,
        address=data.address,
        problem_description=data.problem_description,
        user_id=user_id,
        technician_id=technician.id,
        status="assigned"
    )

    # 🔥 mark busy
    technician.available = False

    db.add(booking)
    db.commit()
    db.refresh(booking)

    return booking


# 📊 USER BOOKINGS
@router.get("/my-bookings")
def get_my_bookings(
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user)
):
    return db.query(Booking).filter(Booking.user_id == user_id).all()


# 🔄 UPDATE STATUS + AUTO FREE TECHNICIAN
@router.put("/update-status/{booking_id}")
def update_booking_status(
    booking_id: str,
    status: str,
    db: Session = Depends(get_db)
):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()

    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    # ✅ normalize input
    status = status.lower().strip()

    valid_status = ["assigned", "in_progress", "completed"]
    if status not in valid_status:
        raise HTTPException(status_code=400, detail="Invalid status")

    booking.status = status

    # 🔥 AUTO FREE TECHNICIAN
    if status == "completed" and booking.technician_id:
        technician = db.query(Technician).filter(
            Technician.id == booking.technician_id
        ).first()

        if not technician:
            raise HTTPException(status_code=404, detail="Technician not found")

        technician.available = True

    db.commit()
    db.refresh(booking)

    return booking