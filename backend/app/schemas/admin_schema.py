from pydantic import BaseModel


class AdminDashboardResponse(BaseModel):
    total_users: int
    total_bookings: int
    total_technicians: int
    completed_bookings: int
    active_bookings: int