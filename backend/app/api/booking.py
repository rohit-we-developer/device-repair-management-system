from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.booking import Booking
from app.schemas.booking_schema import BookingCreate

router = APIRouter()

@router.post("/booking")
def create_booking(data: BookingCreate, db: Session = Depends(get_db)):
    booking = Booking(
        user_id=data.user_id,
        service_id=data.service_id
    )

    db.add(booking)
    db.commit()
    db.refresh(booking)

    return booking