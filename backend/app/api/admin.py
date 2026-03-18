from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.db.database import get_db
from app.models.user import User
from app.models.booking import Booking
from app.models.technician import Technician
from app.models.service import Service
from app.models.review import Review

from app.api.booking import get_current_user

router = APIRouter()


# 🔐 ADMIN CHECK
def get_admin_user(
    user_id: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.id == user_id).first()

    if not user or user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")

    return user


# 📊 DASHBOARD
@router.get("/dashboard")
def admin_dashboard(
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    total_users = db.query(func.count(User.id)).scalar()
    total_bookings = db.query(func.count(Booking.id)).scalar()
    total_technicians = db.query(func.count(Technician.id)).scalar()

    completed_bookings = db.query(func.count(Booking.id)).filter(
        Booking.status == "completed"
    ).scalar()

    active_bookings = db.query(func.count(Booking.id)).filter(
        Booking.status != "completed"
    ).scalar()

    return {
        "total_users": total_users,
        "total_bookings": total_bookings,
        "total_technicians": total_technicians,
        "completed_bookings": completed_bookings,
        "active_bookings": active_bookings
    }


# 💰 REVENUE
@router.get("/revenue")
def get_revenue(
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    revenue = db.query(func.sum(Service.price))\
        .join(Booking, Booking.service_id == Service.id)\
        .filter(Booking.status == "completed")\
        .scalar()

    return {"total_revenue": revenue or 0}


# 📈 MONTHLY REVENUE
@router.get("/monthly-revenue")
def monthly_revenue(
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    result = db.query(
        func.date_trunc('month', Booking.created_at).label("month"),
        func.sum(Service.price).label("revenue")
    )\
    .join(Service, Booking.service_id == Service.id)\
    .filter(Booking.status == "completed")\
    .group_by(func.date_trunc('month', Booking.created_at))\
    .order_by(func.date_trunc('month', Booking.created_at))\
    .all()

    return [
        {"month": str(row.month), "revenue": row.revenue}
        for row in result
    ]


# ⭐ AVERAGE RATING
@router.get("/average-rating")
def average_rating(
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    avg_rating = db.query(func.avg(Review.rating)).scalar()

    return {"average_rating": round(avg_rating or 0, 2)}


# 🔥 TOP SERVICE
@router.get("/top-service")
def top_service(
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    result = db.query(
        Service.title,
        func.count(Booking.id).label("total")
    ).join(Booking, Booking.service_id == Service.id)\
     .group_by(Service.title)\
     .order_by(func.count(Booking.id).desc())\
     .first()

    if not result:
        return {"message": "No data"}

    return {
        "service": result[0],
        "total_bookings": result[1]
    }


# 👨‍🔧 TECHNICIAN LOAD
@router.get("/technician-load")
def technician_load(
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    result = db.query(
        Technician.id,
        func.count(Booking.id).label("jobs")
    ).join(Booking, Booking.technician_id == Technician.id)\
     .group_by(Technician.id)\
     .all()

    return [
        {"technician_id": str(row[0]), "jobs": row[1]}
        for row in result
    ]


# 📊 FULL ANALYTICS
@router.get("/full-analytics")
def full_analytics(
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    total_revenue = db.query(func.sum(Service.price))\
        .join(Booking, Booking.service_id == Service.id)\
        .filter(Booking.status == "completed")\
        .scalar()

    avg_rating = db.query(func.avg(Review.rating)).scalar()
    total_bookings = db.query(func.count(Booking.id)).scalar()

    return {
        "total_revenue": total_revenue or 0,
        "average_rating": round(avg_rating or 0, 2),
        "total_bookings": total_bookings
    }


# 📈 GRAPH: MONTHLY REVENUE
@router.get("/graph/monthly-revenue")
def monthly_revenue_graph(
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    result = db.query(
        func.date_trunc('month', Booking.created_at).label("month"),
        func.sum(Service.price).label("revenue")
    )\
    .join(Service, Booking.service_id == Service.id)\
    .filter(Booking.status == "completed")\
    .group_by(func.date_trunc('month', Booking.created_at))\
    .order_by(func.date_trunc('month', Booking.created_at))\
    .all()

    labels = []
    data = []

    for row in result:
        labels.append(row.month.strftime("%b"))
        data.append(row.revenue)

    return {"labels": labels, "data": data}


# 📊 GRAPH: BOOKING STATUS
@router.get("/graph/booking-status")
def booking_status_graph(
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    assigned = db.query(func.count(Booking.id)).filter(
        Booking.status == "assigned"
    ).scalar()

    in_progress = db.query(func.count(Booking.id)).filter(
        Booking.status == "in_progress"
    ).scalar()

    completed = db.query(func.count(Booking.id)).filter(
        Booking.status == "completed"
    ).scalar()

    return {
        "labels": ["Assigned", "In Progress", "Completed"],
        "data": [assigned, in_progress, completed]
    }