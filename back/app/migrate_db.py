from sqlalchemy import create_engine

from database import Base

""""
    DBマイグレーション用のファイル
    （既存のDBがある場合は削除して作り直す）
"""

DB_URL = "mysql+pymysql://root@db:3306/demo"
engine = create_engine(DB_URL, echo=True)


def reset_database():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
    reset_database()