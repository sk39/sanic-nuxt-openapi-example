import connexion
from todo_app.models import db
from todo_app.api import CustomErrorHandler
import settings


def create_app():
    c_app = connexion.SanicApp(
        __name__,
        specification_dir='../docs'
    )
    c_app.add_api('openapi.v1.yaml')
    sanic_app = c_app.app
    sanic_app.config.DB_DSN = settings.DB_DSN
    sanic_app.config.DB_ECHO = settings.DB_ECHO
    sanic_app.error_handler = CustomErrorHandler()
    db.init_app(sanic_app)
    return c_app
