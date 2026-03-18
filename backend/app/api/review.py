from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.review import Review
from app.models.booking import Booking
from app.schemas.review_schema import ReviewCreate
from app.api.booking import get_current_user

router = APIRouter()


@router.post("/")
def create_review(
    data: ReviewCreate,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user)
):
    booking = db.query(Booking).filter(Booking.id == data.booking_id).first()

    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    # 🔥 CORE LOGIC
    if booking.status != "completed":
        raise HTTPException(status_code=400, detail="Booking not completed")

    review = Review(
        booking_id=data.booking_id,
        user_id=user_id,
        rating=data.rating,
        comment=data.comment
    )

    db.add(review)
    db.commit()
    db.refresh(review)

    return review