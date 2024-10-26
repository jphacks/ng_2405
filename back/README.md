## 各APIの説明
### sign_up (POST /sign_up)
- ユーザー登録を行うAPI
- request bodyに以下のようなJsonでユーザー情報を送信する
```json:body.json
{
  "username": "testuser",
  "password": "testpassword"
}
```
- ユーザー作成に成功したら以下のJsonファイルが返ってくる
```json:return_true.json
{
  "message": "User created successfully"
}
```
- すでに同じユーザー名のユーザーが存在するため作成に失敗した場合は以下のJsonファイルが返ってくる (status code: 400)
```json:return_false.json
{
  "detail": "Username already registered"
}
```

### log_in (POST /log_in)
- ユーザーのログイン処理を行うAPI
- request bodyに以下のようなJsonでユーザー情報を送信する
```json
{
  "username": "testuser",
  "password": "testpassword"
}
```
- 認証に成功したら以下のような形式でアクセストークンとトークンの種類が返ってくる
```json
{
  "access_token": [access_token],
  "token_type": "bearer"
}
```
- 認証に失敗したら以下のような形式のJsonファイルが返ってくる(status code: 401)
```json
{
  "detail": "Incorrect username or password"
}
```

### log_out (POST /log_out)
- ユーザーのログアウト処理を行うAPI
- headerに以下のkey-valueを追加してアクセストークンを送信する
```json
{
  "Authorization": "Bearer [access_token]"
}
```
- 正常にログアウトできたら以下のような形式のJsonファイルが返ってくる
```json
{
  "message": "Successfully logged out"
}
```
- 不正なアクセストークンだった場合，以下のような形式のJsonファイルが返ってくる (status code: 401)
```json
{
    "detail": "Could not validate credentials"
}
```

### add_task (POST /task)
- タスクの追加を行うAPI
- request bodyに以下のようなJsonでタスク情報を送信する
```
{
    "title": "リストの要素を順番に出力する",
    "description": "与えられたリストの要素を順番に出力するプログラムを作成してください。",
    "difficulty": 1,
    "example": "[1, 2, 3, 4, 5]",
    "answer": "1\n2\n3\n4\n5",
    "language": "python",
    "technique": "forループ"
}
```
- headerにはログアウトと同じように以下のkey-valueを追加しておく
```
{
  "Authorization": "Bearer [access_token]"
}
```
- タスクの生成に成功したら以下のようなJsonが返ってくる
```
{
    "message": "Task created successfully"
}
```
### delete_task(DELETE /task/{task_id})
- 指定したIDを持つタスクをGETするAPI
- headerにアクセストークンを追加してリクエストを送信
```
{
  "Authorization": "Bearer [access_token]"
}
```
成功すると以下が返ってくる
```
{
    "message": "Successfully deleted task"
}
```
タスクが存在しない場合は以下が返ってくる。
```
{
    "detail": "Task not found"
}
```
タスクが存在するが、アクセスできない場合は以下が返ってくる。
```
{
    "detail": "You are not authorized to delete this task"
}
```
### get_task(GET /task/{task_id})
- 指定したIDを持つタスクをGETするAPI
- headerにアクセストークンを追加してリクエストを送信
```
{
  "Authorization": "Bearer [access_token]"
}
```
- ログインしているユーザがタスクを確認できる場合は以下のようなレスポンスが返ってくる。
```
{
    "id": 17,
    "language": "test_language",
    "technique": "test_technique",
    "title": "test_title",
    "description": "test_description",
    "user_id": 3,
    "difficulty": 1,
    "is_done": false,
    "limit_at": "2024/11/2"
}
```
タスクが存在しない場合は以下が返ってくる
```
{
    "detail": "Task not found"
}
```
タスクが存在するが、アクセスできない場合は以下が返ってくる。
```
{
    "detail": "You are not authorized to get detail of this task"
}
```

### get_tasks (GET /tasks)
- ログインしているユーザーのすべてのタスクをGETするAPI
- headerにログアウトと同じように以下のkey-valueを追加してリクエストを送信
```
{
  "Authorization": "Bearer [access_token]"
}
```
- すべてのタスクをGETすることに成功したら以下のようなJsonが返ってくる
```
{
    "tasks": [
        {
            "id": 1,
            "language": "test_language",
            "technique": "test_technique",
            "title": "test_title",
            "description": "test_description",
            "user_id": 1,
            "difficulty": 1,
            "is_done": false,
            "limit_at": "2024/11/1"
        },
        {
            "id": 2,
            "language": "test_language2",
            "technique": "test_technique2",
            "title": "test_title2",
            "description": "test_description2",
            "user_id": 1,
            "difficulty": 2,
            "is_done": false,
            "limit_at": "2024/11/1"
        }
    ]
}
```
### do_task (PATCH /done_task/{task_id})
- taskの達成フラグをtrueにする
- headerにアクセストークンを追加してリクエストを送信
```
{
  "Authorization": "Bearer [access_token]"
}
```
- 成功すると以下が返ってくる。
{
    "message": "Task completed successfully"
}
タスクが存在しない場合は以下が返ってくる
```
{
    "detail": "Task not found"
}
```
タスクが存在するが、アクセスできない場合は以下が返ってくる。
```
{
    "detail": "You are not authorized to complete this task"
}
```
### edit_task (PATCH /task/id)
- taskの情報を編集する
- headerにアクセストークンを追加してリクエストを送信
```
{
  "Authorization": "Bearer [access_token]"
}
```
- bodyにtasの情報を全て含める
```
{
    "language": "test_language",
    "technique": "test_technique",
    "title": "test_title",
    "description": "test_description",
    "difficulty": 2
}
```
成功すると、以下が返ってくる。
```
{
    "message": "Task edited successfully"
}
```
taskが存在しない場合は以下が返ってくる。
```
{
    "detail": "Task not found"
}
```
taskにアクセスできない場合は以下が返ってくる。
```
{
    "detail": "You are not authorized to edit this task"
}
```
### get_gemini (GET /gemini)
- 言語とテクニックに応じてGeminiにタスク例を考えさせる
- request bodyに以下のようにしてlanguageとtechniqueを送信する
```
{
    "language": "python",
    "technique": "forループ"
}
```
- headerにログアウトと同じように以下のkey-valueを追加してリクエストを送信
```
{
  "Authorization": "Bearer [access_token]"
}
```
- Geminiから正常に返ってくると以下のようなJsonが返ってくる
```
{
    "tasks": [
        {
            "title": "偶数の合計",
            "description": "1から10までの偶数の合計を計算してください。",
            "difficulty": 1,
            "language": "python",
            "technique": "forループ"
        },
        {
            "title": "リストの最大値",
            "description": "与えられたリストから最大値を見つけてください。\nリスト: [5, 2, 8, 1, 9]",
            "difficulty": 2,
            "language": "python",
            "technique": "forループ"
        },
        {
            "title": "フィボナッチ数列",
            "description": "与えられた数nまでのフィボナッチ数列を生成してください。\n例: n=5\n出力: [0, 1, 1, 2, 3]",
            "difficulty": 3,
            "language": "python",
            "technique": "forループ"
        }
    ]
}
```
