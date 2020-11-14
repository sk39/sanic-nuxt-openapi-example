from sanic.exceptions import SanicException, Unauthorized
from sanic import response
from jose import JWTError, jwt
from datetime import datetime, timedelta

JWT_ISSUER = 'todo.app.example'
JWT_SECRET = 'secret_key_todo'

JWT_ACCESS_LIFETIME_MINIUTES = 60
JWT_REFRESH_LIFETIME_DAYS = 7
JWT_ALGORITHM = 'HS256'

# TODO: ユーザ認証(ユーザ管理)は割愛


def sign_in(request, body):
    user_id = body["user_id"]
    if not user_id:
        raise SanicException("'user_id' is a required property", status_code=400)
    return _generate_token_response(user_id)


def refresh_token(request, body):
    payload = decode_token(body["refresh_token"], token_type="refresh")
    user_id = payload["sub"]
    return _generate_token_response(user_id)


def get_sign_in_user(user: str, token_info):
    return response.json({
        "id": user
    })


def _generate_token_response(user_id: str):
    current = datetime.now()

    access_token = _generate_token(
        user_id=user_id,
        token_type="access",
        current=current,
        exp=current+timedelta(minutes=JWT_ACCESS_LIFETIME_MINIUTES)
    )

    refresh_token = _generate_token(
        user_id=user_id,
        token_type="refresh",
        current=current,
        exp=current+timedelta(days=JWT_REFRESH_LIFETIME_DAYS)
    )

    return response.json({
        "access_token": access_token,
        "refresh_token":  refresh_token
    })


def _generate_token(user_id: str, token_type: str, current, exp):
    print("_generate_token", current, exp)
    payload = {
        "iss": JWT_ISSUER,
        "iat": int(current.timestamp()),
        "exp": int(exp.timestamp()),
        "sub": user_id,
        "token_type": token_type
    }

    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def decode_token(token: str, token_type: str = "access"):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload['token_type'] != token_type:
            raise JWTError
        return payload
    except JWTError:
        raise Unauthorized("Unauthorized", status_code=401)
