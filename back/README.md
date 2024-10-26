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
- 不正なアクセストークだった場合，以下のような形式のJsonファイルが返ってくる (status code: 401)
```json
{
    "detail": "Could not validate credentials"
}
```
