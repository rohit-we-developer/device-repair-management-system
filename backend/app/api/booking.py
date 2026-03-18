from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.booking import Booking
from app.models.service import Service
from app.models.technician import Technician
from app.schemas.booking_schema import BookingCreate

router = APIRouter()


@router.post("/")
def create_booking(data: BookingCreate, db: Session = Depends(get_db)):

    # ✅ check service exists
    service = db.query(Service).filter(Service.id == data.service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")

    # ✅ find available technician
    technician = db.query(Technician).filter(Technician.available == True).first()
    if not technician:
        raise HTTPException(status_code=404, detail="No technician available")

    # ✅ create booking
    booking = Booking(
        user_id=data.user_id,
        service_id=data.service_id,
        technician_id=technician.id,
        address=data.address,
        problem_description=data.problem_description,
        status="assigned"
    )

    # ✅ mark technician busy
    technician.available = False

    db.add(booking)
    db.commit()
    db.refresh(booking)

    return booking