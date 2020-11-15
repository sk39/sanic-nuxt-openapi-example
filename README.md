# sanic-nuxt-openapi-example
To-do app develop in OpenAPI, Sanic and Nuxt.

* OpenAPI First
* バックエンドはPython。WebフレームワークはSanic & connexion。
  - connexionにてOpenAPI Specification(OAS)からルーティングなどを自動処理
* フロントエンドはNuxt(Vue.js)
  - Typescript
  - openapi-generatorにてOASから通信部分は自動生成(Typesafe)
* DBMSはPostgreSQL


## Requirement
* Docker
* Python 3.8+
* Poetry
* Node.js
* Java 8+
  - openapi-generator(フロントの通信コード生成)を使う場合のみ


## Quick Start
### Backend
```bash
cd backend

## start db
docker-compose up -d

## setup
python3 -m venv venv
source venv/bin/activate
poetry install

## migrate db
alembic upgrade head

## run via ASGI
uvicorn --reload main:app --port 8080
```

See [backend/README.md](backend/README.md) for details.

### Frontend
```bash
cd frontend

## install dependencies
npm install

## serve with hot reload at localhost:3000
npm run dev
```

See [frontend/README.md](frontend/README.md) for details.
