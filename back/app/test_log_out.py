from fastapi.testclient import TestClient
from main import app, blacklisted_tokens, create_access_token
from datetime import timedelta

client = TestClient(app)

def test_logout_with_valid_token():
    # トークンを作成
    access_token = create_access_token(data={"sub": "testuser"}, expires_delta=timedelta(minutes=30))

    # 有効なトークンでログアウトリクエストを送信
    response = client.post(
        "/log_out",
        headers={"Authorization": f"Bearer {access_token}"}
    )

    # ステータスコードの確認
    assert response.status_code == 200
    assert response.json() == {"message": "Successfully logged out"}

    # トークンがブラックリストに追加されていることを確認
    assert access_token in blacklisted_tokens

def test_logout_with_invalid_token():
    # 無効なトークンを使用してログアウトリクエストを送信
    invalid_token = "some_invalid_token"
    response = client.post(
        "/log_out",
        headers={"Authorization": f"Bearer {invalid_token}"}
    )

    # ステータスコードの確認
    assert response.status_code == 401
    assert response.json()["detail"] == "Could not validate credentials"
