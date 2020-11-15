# sanic-nuxt-openapi-example
OpenAPI, Sanic, NuxtのサンプルTo-doアプリ。

* OpenAPIスキーマファースト
  - 最初にOpenAPI Specification(OAS)を作成。
* バックエンドはPython。WebフレームワークはSanic。
  - connexionにて、OASからルーティングなどの実装を自動生成。
* フロントエンドはNuxt(Vue.js)
  - openapi-generatorを利用して、OASからサーバとの通信部分は自動生成。
* DBMSはPostgreSQL


## Requirement
* Docker
* Python 3.8+
* Poetry
* Node.js


## バックエンド起動
```bash
cd backend

## DB起動
docker-compose up -d

## 環境構築
python3 -m venv venv
source venv/bin/activate
poetry install

## DBマイグレート
alembic upgrade head

## 起動
uvicorn --reload main:app --port 8080
```

上記以外のコマンドについては[backend/README.md](backend/README.md)を参照

## フロントエンド起動
```bash
cd frontend

## 環境構築
npm install

## 起動
npm run dev
```

上記以外のコマンドについては[frontend/README.md](frontend/README.md)を参照
