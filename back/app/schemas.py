from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    username: str
    password: str

class LoginUser(BaseModel):
    username: str
    password: str

class TokenData(BaseModel):
    username: Optional[str] = None