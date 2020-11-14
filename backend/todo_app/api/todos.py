from sanic import response
from sanic.exceptions import NotFound, InvalidUsage
from ..models import Todo


async def list_todo(request, user: str):
    todos = await Todo.query.where(Todo.user_id == user).order_by(Todo.id).gino.all()
    return response.json({'list': [todo.to_dict() for todo in todos]})


async def create_todo(request, user: str, body):
    if not body['title']:
        raise InvalidUsage("'title' is a required property")

    await Todo.create(
        title=body['title'],
        completed=False,
        user_id=user,
    )
    return response.json({'result': 'OK'}, status=201)


async def _get_todo_raw(user: str, id: str):
    todo = await Todo.query.where(Todo.id == int(id)).gino.one_or_none()
    if not todo or todo.user_id != user:
        raise NotFound("Not Found")
    return todo


async def get_todo(request, user: str, id: str):
    todo = await _get_todo_raw(user, id)
    return response.json(todo.to_dict())


async def update_todo(request, user: str, id: str, body):
    todo = await _get_todo_raw(user, id)
    await todo.update(**body).apply()
    return response.json({}, status=204)


async def remove_todo(request, user: str, id: str):
    todo = await _get_todo_raw(user, id)
    await todo.delete()
    return response.json({}, status=204)
