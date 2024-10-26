# サンプル（プロダクト名）

[![IMAGE ALT TEXT HERE](https://jphacks.com/wp-content/uploads/2024/07/JPHACKS2024_ogp.jpg)](https://www.youtube.com/watch?v=DZXUkEj-CSI)

## 製品概要

### 背景(製品開発のきっかけ、課題等）

### 製品説明（具体的な製品の説明）

### 特長

#### 1. 特長 1

#### 2. 特長 2

#### 3. 特長 3

### 解決出来ること

### 今後の展望

### 注力したこと（こだわり等）

-
-

## 開発技術

### 活用した技術

#### API・データ

-
-

#### フレームワーク・ライブラリ・モジュール

-
-

#### デバイス

-
-

### 独自技術

#### ハッカソンで開発した独自機能・技術

- 独自で開発したものの内容をこちらに記載してください
- 特に力を入れた部分をファイルリンク、または commit_id を記載してください。

# JPHacks

## テーマ

- ☆ プログラミング学習の支援アプリ
  - 適当なアプリの提案をしてくれる
    - 必要な機能
    - 難易度
      - 難易度別で３つくらい？
  - 使いたい技術（機能：python のループ処理学びました。pytorch 学びました）をいうとそれに合わせてそれらの技術を使ったコードの提案をしてくれる
  - https://chatgpt.com/share/6713a1af-9598-8000-b925-4eb8565b752d
  - 学んだことの定着度合いを確かめたい
  - 詰まったらヒントくれる
- プロンプト例 - Python で for ループだけを使った具体的な task を難易度別に考えてください．
  実際の値なども教えて下さい． - https://chatgpt.com/share/6713ab18-01d4-8000-876b-93d22c841427

## 要件

### 必須機能

- ユーザーがテキストを入力する場所
- 入力されたテキストを元に LLM に投げる
  - 提案は難易度別に複数
- 帰ってきた答えを出力する
- 履歴
  - ログイン機能

https://chatgpt.com/c/6713a602-6674-8011-9963-8584efd26472

### あってもいいかな機能

- ヒントを出す機能
- 提案課題の達成状況の更新・管理
- 終わったタスクと実施中のタスクで分ける（task 一覧ページでフィルタリング？）
- 期限
- 学習内容を教えてくれる機能
- task を言語ごとで filter
- 選択した task を編集・削除する機能

### api

- sign up (POST /sign_up)
- log in (GET /log_in)
- log out (GET /log_out)
- GPT に prompt を投げて出力をゲットする api (GET /gpt)
- DB に task を追加 (POST /task)
- task 編集 (PATCH /task)
- task 削除 (DELETE /task)
- task の達成フラグを true (POST /task_done)
- user の task 一覧を取得 (GET /tasks)

### DB

- user
  - id: int
  - name: string (unique)
  - password: string
- task
  - id: int
  - language: string
  - technique: string
  - title: string
  - description: string
  - user_id: int (foreign_key)
  - difficulty: 1 | 2 | 3
  - is_done: boolean
  - (limit_at: datetime)

### デザイン（UI）

- トップページ (/)
  - 言語のプルダウン
  - technique の入力欄
  - 出力の表示
  - task の選択（複数選択可）→task の保存
  - task 一覧の表示（数件）
  - ログアウトボタン
- task 一覧（/tasks）
  - 履歴（フル）
  - （filter のプルダウン）
- ログイン/サインアップページ (/log_in)
  - name, password を入力する
  - sign up ボタン
- task 詳細 (/task/:id)

  - （達成ボタン）
  - （ヒントボタン）

- front
  - localhost:3000
  - docker command
    - cd front # front に移動
    - docker compose up -d # docker container を立ち上げる
    - docker compose exec front bash # docker 内の bash に入り込む
    - npm install # ライブラリ等をインストール
    - npm run dev # サーバーを立ち上げる
    - http://localhost:3000 に移動してサーバーが立ち上がっていることを確認する。
- back
  - localhost:8000
  - docker
    - ~イメージビルド: docker build -t myimage .~
    - ~コンテナの起動: docker run -d --name mycontainer -p 80:80 myimage~
    - まず db を立ち上げる: docker compose up -d db
    - 次に demo-app を立ち上げる: docker compose up -d demo-app
    - docker exec -it demo-app bash で demo-app 内の bash に入れる
    - http://127.0.0.1/ にアクセスして確認
    - 参考: https://fastapi.tiangolo.com/ja/deployment/docker/#docker_1
