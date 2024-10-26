from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, CheckConstraint
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    hashed_password = Column(String(100))


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    language = Column(String(50))
    technique = Column(String(50))
    title = Column(String(50))
    description = Column(String(100))
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))  # Foreign Key（"mysql+pymysql://root@db:3306/demo"親が削除されたら削除）
    difficulty = Column(Integer, CheckConstraint("difficulty in (1, 2, 3)"))  # Check制約（1, 2, 3のいずれか）   
    is_done = Column(Boolean, default=False)
    limit_at = Column(DateTime)

    def to_dict(self):
        return {'id': self.id,
                'language': self.language,
                'technique': self.technique,
                'title': self.title,
                'description': self.description,
                'user_id': self.user_id,
                'difficulty': self.difficulty,
                'is_done': self.is_done,
                'limit_at': self.limit_at}