from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
import jwt
import google.generativeai as genai
import os
import time
from typing import Set
from database import engine, Base, SessionLocal
from models import User, Task
from schemas import UserCreate, LoginUser, TokenData, TaskData, TaskComponent
from utils import hash_password, authenticate_user, create_access_token, verificate_user, validate_Gemini_response, SECRET_KEY, ALGORITHM
from datetime import timedelta, datetime

app = FastAPI()

genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel("gemini-1.5-flash",  generation_config={"response_mime_type": "application/json"})


origins = [
    "http://localhost:3000",
    "http://localhost:8000",
    "http://localhost:3306"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

ACCESS_TOKEN_EXPIRE_MINUTES = 300

blacklisted_tokens: Set[str] = set()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.get("/")
def read_root():
    return {"Hello": "World"}

# データベースセッションを取得する関数
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# サインアップエンドポイント
@app.post("/sign_up/")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    # ユーザー名が既に存在するかチェック
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    # 新しいユーザーを作成
    hashed_password = hash_password(user.password)
    new_user = User(username=user.username, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created successfully"}

@app.post("/log_in/")
def login_for_access_token(user: LoginUser, db: Session = Depends(get_db)):
    user = authenticate_user(db, user.username, user.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    if token in blacklisted_tokens:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has been revoked",
            headers={"WWW-Authenticate": "Bearer"},
        )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except jwt.PyJWTError:
        raise credentials_exception
    user = db.query(User).filter(User.username == token_data.username).first()
    if user is None:
        raise credentials_exception
    return user

@app.post("/log_out")
def logout(token: str = Depends(oauth2_scheme), current_user: User = Depends(get_current_user)):
    # トークンをブラックリストに追加
    blacklisted_tokens.add(token)
    return {"message": "Successfully logged out"}

@app.post("/task")
def add_task(task: TaskData, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    now_date = datetime.now()
    new_task = Task(language=task.language, technique=task.technique, title=task.title, description=task.description, user_id=current_user.id, difficulty=task.difficulty, is_done=False, limit_at=now_date + timedelta(weeks=1))

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return {"message": "Task created successfully"}

@app.get("/task/{task_id}")
def get_task(task_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    # ユーザーがタスクを削除する権限がない場合
    if verificate_user(db, task_id, current_user.id) is False:
        raise HTTPException(status_code=403, detail="You are not authorized to get detail of this task")
    
    task_dict = task.to_dict()
    limit: datetime = task_dict['limit_at']
    task_dict['limit_at'] = '%s/%s/%s' % (limit.year, limit.month, limit.day)
    return task_dict

@app.get("/tasks")
def get_all_tasks(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    tasks = db.query(Task).filter(Task.user_id == current_user.id).all()
    task_list = []
    for task in tasks:
        task_dict = task.to_dict()
        limit: datetime = task_dict['limit_at']
        task_dict['limit_at'] = '%s/%s/%s' % (limit.year, limit.month, limit.day)
        task_list.append(task_dict)
    
    result = {'tasks': task_list}
    return result


@app.delete("/task/{task_id}")
def delete_task(task_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()
    # タスクが存在しない場合
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    # ユーザーがタスクを削除する権限がない場合
    if verificate_user(db, task_id, current_user.id) is False:
        raise HTTPException(status_code=403, detail="You are not authorized to delete this task")
    # タスクを削除
    else:
        task = db.query(Task).filter(Task.id == task_id).first()
        db.delete(task)
        db.commit()
    return {"message": "Successfully deleted task"}

@app.patch("/task_done/{task_id}")
def do_task(task_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()
    # タスクが存在しない場合
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    # ユーザーがタスクを完了する権限がない場合
    if verificate_user(db, task_id, current_user.id) is False:
        raise HTTPException(status_code=403, detail="You are not authorized to complete this task")
    # タスクを完了
    task.is_done = True
    db.commit()
    return {"message": "Task completed successfully"}


@app.patch("/task/{task_id}")
def edit_task(task_id: int, task: TaskData, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # タスクを取得
    existing_task = db.query(Task).filter(Task.id == task_id).first()
    
    # タスクが存在しない場合
    if not existing_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # ユーザーがタスクを編集する権限がない場合
    if not verificate_user(db, task_id, current_user.id):
        raise HTTPException(status_code=403, detail="You are not authorized to edit this task")
    
    # タスクを編集
    existing_task.language = task.language
    existing_task.technique = task.technique
    existing_task.title = task.title
    existing_task.description = task.description
    existing_task.difficulty = task.difficulty
    
    # 変更をデータベースにコミット
    db.commit()
    
    return {"message": "Task edited successfully"}

@app.get("/gemini")
def get_task_from_Gemini(task_componnent: TaskComponent, current_user: User = Depends(get_current_user)):
    prompt = f'''{task_componnent.language}で{task_componnent.technique}だけを使ったタスクの例を３段階の難易度で１つずつJson形式で提案してください．
    実際の値も含んでください
    keyには以下の項目を含んでください．
    - "title"
    - "description"
    - "difficulty"
    
    "title"にはタスクのタイトルをvalueに入れてください．
    "description"にはタスクの詳細な説明をvalueに入れてください．
    "difficulty"にはタスクの難易度を数字の1か2か3でvalueに入れてください．
    難易度は1が一番易しく，2が中間，3が一番難しいです．'''
    while True:
        response = model.generate_content(prompt)
        response_json = validate_Gemini_response(response.text)
        if response_json != False:
            break
        time.sleep(1)
    
    for i in range(3):
        response_json[i]['language'] = task_componnent.language
        response_json[i]['technique'] = task_componnent.technique
        

    return {"tasks": response_json}
