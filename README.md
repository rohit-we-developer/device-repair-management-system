# Device Repair Management System

A full-stack device repair service platform where users can book laptop/device repair services, track repair status, and manage repair requests.

## 🚀 Tech Stack

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL (Supabase)

### Frontend
- Next.js
- React
- Tailwind CSS

---

## ✨ Features

- User registration & authentication
- Book device repair services
- Track repair status
- Technician management
- Service request management
- REST API with FastAPI

---

## 📁 Project Structure
device-repair-management-system
│
├── backend
│ └── FastAPI backend API
│
├── frontend
│ └── Next.js frontend application
│
└── database

---

⚙️ Backend Setup (FastAPI)
cd backend

# create virtual environment
python -m venv venv

# activate (Windows)
venv\Scripts\activate

# install dependencies
pip install -r requirements.txt

# run server
uvicorn main:app --reload

👉 Backend will run on: http://127.0.0.1:8000

🌐 Frontend Setup (Next.js)
cd frontend

# install dependencies
npm install

# run frontend
npm run dev
👉 Frontend will run on: http://localhost:3000

-- Important Notes

Do NOT push node_modules or .next

Do NOT push venv

Always run npm install after cloning

Always run pip install -r requirements.txt

🚀 Clone & Run
git clone <your-repo-url>
cd project-root

👨‍💻 Author
Rohit Wagh

