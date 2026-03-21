import os
from jose import jwt
from datetime import datetime, timedelta

# 🔥 ENV मधून SECRET KEY घे
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# ❌ missing असेल तर crash (best practice)
if not SECRET_KEY:
    raise Exception("SECRET_KEY not found in environment variables")


def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)