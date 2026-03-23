from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.service import Service
from app.schemas.service_schema import ServiceCreate, ServiceResponse

router = APIRouter(prefix="/services", tags=["Services"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 🔥 CREATE
@router.post("/", response_model=ServiceResponse)
def create_service(service: ServiceCreate, db: Session = Depends(get_db)):
    new_service = Service(**service.model_dump())

    db.add(new_service)
    db.commit()
    db.refresh(new_service)

    return new_service


# 🔥 GET ONLY ACTIVE SERVICES (USER SIDE)
@router.get("/", response_model=list[ServiceResponse])
def get_services(db: Session = Depends(get_db)):
    return db.query(Service).filter(Service.is_active == True).all()


# 🔥 ADMIN GET ALL (ACTIVE + INACTIVE)
@router.get("/admin/all", response_model=list[ServiceResponse])
def get_all_services(db: Session = Depends(get_db)):
    return db.query(Service).all()


# 🔥 TOGGLE ACTIVE / INACTIVE
@router.put("/toggle/{service_id}")
def toggle_service(service_id: str, db: Session = Depends(get_db)):
    service = db.query(Service).filter(Service.id == service_id).first()

    if not service:
        raise HTTPException(status_code=404, detail="Service not found")

    service.is_active = not service.is_active

    db.commit()
    db.refresh(service)

    return {
        "id": str(service.id),
        "is_active": service.is_active
    }

# 🔥 DELETE (optional but powerful)
@router.delete("/{service_id}")
def delete_service(service_id: str, db: Session = Depends(get_db)):
    service = db.query(Service).filter(Service.id == service_id).first()

    if not service:
        raise HTTPException(status_code=404, detail="Service not found")

    db.delete(service)
    db.commit()

    return {"message": "Service deleted"}

@router.put("/{service_id}", response_model=ServiceResponse)
def update_service(service_id: str, service: ServiceCreate, db: Session = Depends(get_db)):
    existing = db.query(Service).filter(Service.id == service_id).first()

    if not existing:
        raise HTTPException(status_code=404, detail="Service not found")

    existing.title = service.title
    existing.description = service.description
    existing.price = service.price
    existing.estimated_time = service.estimated_time

    db.commit()
    db.refresh(existing)

    return existing