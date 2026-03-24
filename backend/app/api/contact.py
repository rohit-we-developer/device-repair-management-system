from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.contact import Contact
from pydantic import BaseModel

router = APIRouter(prefix="/contact", tags=["Contact"])

# 🔥 SCHEMA
class ContactCreate(BaseModel):
    name: str
    email: str
    message: str


# ✅ CREATE MESSAGE
@router.post("/")
def create_contact(data: ContactCreate, db: Session = Depends(get_db)):

    new_msg = Contact(
        name=data.name,
        email=data.email,
        message=data.message
    )

    db.add(new_msg)
    db.commit()

    return {"message": "Message sent successfully"}


# ✅ GET ALL MESSAGES (ADMIN INBOX)
@router.get("/")
def get_all_contacts(db: Session = Depends(get_db)):
    messages = db.query(Contact).order_by(Contact.created_at.desc()).all()
    return messages


# ✅ DELETE MESSAGE
@router.delete("/{id}")
def delete_contact(id: str, db: Session = Depends(get_db)):

    msg = db.query(Contact).filter(Contact.id == id).first()

    if not msg:
        return {"error": "Message not found"}

    db.delete(msg)
    db.commit()

    return {"message": "Deleted successfully"}