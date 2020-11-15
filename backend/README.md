# todo-app-backend

## Requirement
* Docker
* Python 3.8+
* Poetry

## Build Setup
```bash
## start db
docker-compose up -d

## remove db
docker-compose down

## setup
python3 -m venv venv
source venv/bin/activate
poetry install

## create db migrate
alembic revision --autogenerate -m "<message>"

## migrate db
alembic upgrade head

## test
pytest

## run server
python main.py

## run via ASGI
uvicorn --reload main:app --port 8080
```

## Note
サーバ起動後、以下のURLからAPIのテストが可能 (Swagger)。

http://127.0.0.1:8080/v1/api/ui/#/

#### 認証が必要なAPIの実行方法
* POST `/auth`を実行
* レスポンスの`access_token`をコピー
* Authorizeをクリック。表示されるダイアログの`jwt`にコピーしたトークンを指定して、`Authorize`をクリック。
