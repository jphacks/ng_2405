from fastapi import HTTPException
from passlib.context import CryptContext
import jwt
import json
from typing import Optional
from datetime import datetime, timedelta, timezone
from models import User, Task
from schemas import TaskData

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "mysecretkey"
ALGORITHM = "HS256"


def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def authenticate_user(db, username: str, password: str):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

def verificate_user(db, task_id: int, user_id: int):
    # アクセスしたユーザがタスクにアクセスできるかを確認する関数
    task = db.query(Task).filter(Task.id == task_id).first()
    if task.user_id != user_id:
        return False
    return True

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def validate_Gemini_response(text):
    try:
        text_json = json.loads(text)
    except json.decoder.JSONDecodeError:
        return False
    
    if len(text_json) != 3:
        return False
    ans = text_json
    for i in range(3):
        if not 'title' in text_json[i]:
            ans = False
        if not 'description' in text_json[i]:
            ans = False
        if not 'difficulty' in text_json[i] or text_json[i]['difficulty'] != i + 1:
            ans = False
        if not 'example' in text_json[i]:
            ans = False
        if not 'answer' in text_json[i]:
            ans = False
    return ans