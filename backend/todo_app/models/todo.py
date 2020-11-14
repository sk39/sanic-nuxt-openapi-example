from .db import db
from sqlalchemy import Column, func
from sqlalchemy.types import Integer, String, Boolean, DateTime


class Todo(db.Model):
    __tablename__ = 'todo'
    id = Column(Integer, primary_key=True)
    title = Column(String(255))
    completed = Column(Boolean)
    user_id = Column(String(20))
    created_at = Column(
        DateTime,
        server_default=func.now()
    )
    updated_at = Column(
        DateTime,
        server_default=func.now(),
        onupdate=func.now()
    )

    _idx = db.Index('idx_todo_user_id', 'user_id')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'completed': self.completed,
            'user_id': self.user_id,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'updated_at': self.updated_at.strftime('%Y-%m-%d %H:%M:%S')
        }
