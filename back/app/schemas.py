from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    username: str
    password: str

class LoginUser(BaseModel):
    username: str
    password: str

class TokenData(BaseModel):
    username: Optional[str] = None

class TaskData(BaseModel):
    id: int | None
    language: str
    technique: str
    title: str
    description: str
    example: str
    answer: str
    difficulty: int
    is_done: bool | None
    limit_at: datetime | None

class TaskComponent(BaseModel):
    language: str
    technique: str
