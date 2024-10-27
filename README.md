言語# サンプル（プロダクト名）

[![IMAGE ALT TEXT HERE](https://jphacks.com/wp-content/uploads/2024/07/JPHACKS2024_ogp.jpg)](https://www.youtube.com/watch?v=DZXUkEj-CSI)

## 製品概要
### 背景(製品開発のきっかけ、課題等）
IT学習（プログラミング学習）において「とりあえず技術を学んだがそれをどのように使うのかが分からない」，「教科書や本の内容だけでなくより実用的な開発をしたい」という段階が必ずあるが，それを支援するような仕組みがない
### 製品説明（具体的な製品の説明）
使う言語，使うテクニックをユーザーが指定すると生成AIが適切な課題目標を提示してくれる
### 特長
#### 1. 提示されるタスクは難易度ごとに分かれていて3段階の難易度のタスクから選べる
#### 2. 選択したタスクの管理（達成したか，期限など）ができる
#### 3. タスク一覧でタスクの属性（使う言語，達成しているかなどで）フィルタリングができる

### 解決出来ること
「技術を学んだが定着しているかが分からない」といったときに実際にタスクができるかどうかで定着しているかが分かる
### 今後の展望
### 注力したこと（こだわり等）
* 使いたい技術だけを確かめることができるようにプロンプトを調整（例えばfor-loopに関するタスクを解きたいのにクラスなどの他の要素を知らないと解けないタスクは提示しない）
* 

## 開発技術
### 活用した技術
#### API・データ
* Gemini API
* 

#### フレームワーク・ライブラリ・モジュール
* FastAPI
* Node.js

#### デバイス
* 
* 

### 独自技術
#### ハッカソンで開発した独自機能・技術
* 独自で開発したものの内容をこちらに記載してください
* 特に力を入れた部分をファイルリンク、またはcommit_idを記載してください。

# JPHacks
## テーマ



- ☆プログラミング学習の支援アプリ
    - 適当なアプリの提案をしてくれる
        - 必要な機能
        - 難易度
            - 難易度別で３つくらい？
    - 使いたい技術（機能：pythonのループ処理学びました。pytorch学びました）をいうとそれに合わせてそれらの技術を使ったコードの提案をしてくれる
    - https://chatgpt.com/share/6713a1af-9598-8000-b925-4eb8565b752d
    - 学んだことの定着度合いを確かめたい
    - 詰まったらヒントくれる
- プロンプト例
    - Pythonでforループだけを使った具体的なtaskを難易度別に考えてください．
実際の値なども教えて下さい．
    - https://chatgpt.com/share/6713ab18-01d4-8000-876b-93d22c841427

## 要件
### 必須機能
- ユーザーがテキストを入力する場所
- 入力されたテキストを元にLLMに投げる
    - 提案は難易度別に複数
- 帰ってきた答えを出力する
- 履歴
    - ログイン機能

https://chatgpt.com/c/6713a602-6674-8011-9963-8584efd26472

### あってもいいかな機能
- ヒントを出す機能
- 提案課題の達成状況の更新・管理
- 終わったタスクと実施中のタスクで分ける（task一覧ページでフィルタリング？）
- 期限
- 学習内容を教えてくれる機能
- taskを言語ごとでfilter
- 選択したtaskを編集・削除する機能


### api
- sign up (POST /sign_up)
- log in (GET /log_in)
- log out (GET /log_out)
- GPTにpromptを投げて出力をゲットするapi (GET /gpt)
- DBにtaskを追加 (POST /task)
- task編集 (PATCH /task)
- task削除 (DELETE /task)
- taskの達成フラグをtrue (POST /task_done)
- userのtask一覧を取得 (GET /tasks)


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
    - techniqueの入力欄
    - 出力の表示
    - taskの選択（複数選択可）→taskの保存
    - task一覧の表示（数件）
    - ログアウトボタン
- task一覧（/tasks）
    - 履歴（フル）
    - （filterのプルダウン）
- ログイン/サインアップページ (/log_in)
    - name, passwordを入力する
    - sign upボタン
- task詳細 (/task/:id)
    - （達成ボタン）
    - （ヒントボタン）

- front
    - localhost:3000
    - docker command
      - cd front # frontに移動
      - docker compose up -d # docker containerを立ち上げる
      - docker compose exec front bash # docker内のbashに入り込む
      - npm install # ライブラリ等をインストール
      - npm run dev # サーバーを立ち上げる
      - http://localhost:3000 に移動してサーバーが立ち上がっていることを確認する。
- back
    - localhost:8000
    - docker
        - ~イメージビルド: docker build -t myimage .~
        - ~コンテナの起動: docker run -d --name mycontainer -p 80:80 myimage~
        - まずdbを立ち上げる: docker compose up -d db
        - 次にdemo-appを立ち上げる: docker compose up -d demo-app
        - docker exec -it demo-app bash でdemo-app内のbashに入れる
        - http://127.0.0.1/ にアクセスして確認　
        - 参考: https://fastapi.tiangolo.com/ja/deployment/docker/#docker_1
