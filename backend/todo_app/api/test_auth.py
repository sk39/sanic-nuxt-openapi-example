
from todo_app.api.auth import _generate_token, decode_token
from datetime import datetime, timedelta


def test_generate_access_token():
    user_id = "dummy"
    current = datetime.now()
    exp = current+timedelta(minutes=10)
    token = _generate_token(user_id, "access", current, exp)
    payload = decode_token(token)

    assert payload["sub"] == user_id
    assert payload["token_type"] == "access"
    assert payload["iat"] == int(current.timestamp())
    assert payload["exp"] == int(exp.timestamp())


def test_generate_refresh_token():
    user_id = "dummy"
    current = datetime.now()
    exp = current+timedelta(days=30)
    token = _generate_token(user_id, "refresh", current, exp)
    payload = decode_token(token, "refresh")

    assert payload["sub"] == user_id
    assert payload["token_type"] == "refresh"
    assert payload["iat"] == int(current.timestamp())
    assert payload["exp"] == int(exp.timestamp())
