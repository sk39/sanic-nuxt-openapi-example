from sanic import response
from sanic.handlers import ErrorHandler
from connexion.exceptions import OAuthProblem, BadRequestProblem


class CustomErrorHandler(ErrorHandler):
    def _to_json(self, message, status):
        # TODO: エラーの複数指定
        return response.json({
            "errors": [{
                "message": message
            }]
        }, status=status)

    def default(self, request, exception):
        if isinstance(exception, OAuthProblem):
            return self._to_json(message="Unauthorized", status=401)

        if isinstance(exception, BadRequestProblem):
            return self._to_json(message=getattr(exception, "detail", None), status=400)

        status = getattr(exception, "status_code", 500)
        message = getattr(exception, "message", str(exception))
        if status == 500:
            print(exception)

        return self._to_json(message=message, status=status)
