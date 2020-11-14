#!/usr/bin/env python3

from todo_app import create_app
from sanic_cors import CORS, cross_origin  # noqa
import settings

app = create_app().app
CORS(app)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, auto_reload=settings.DEBUG)
