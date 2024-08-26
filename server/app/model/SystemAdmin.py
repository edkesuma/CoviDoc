# Libraries
from flask import current_app
from typing_extensions import Self # type: ignore
from typing import Dict
import uuid

# Local dependencies
from .sqlalchemy import db

class SystemAdmin(db.Model):
    __tablename__ = "SystemAdmin"
    # Attributes
    id = db.Column(db.String, primary_key=True, default=lambda: f"SA{str(uuid.uuid4().hex)}")
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    phone = db.Column(db.String, unique=True, nullable=False)

    @classmethod
    def queryAdminAccount(cls, id: str) -> Self:
        """Query a user account by id"""
        return cls.query.filter(cls.id == id).one_or_none()
    
    @classmethod
    def queryAllAdminAccounts(cls) -> Self:
        """Query all admin accounts"""
        return cls.query.all()
    
    @classmethod
    def createNewAdmin(cls, details: Dict[str, str]) -> bool:
        """Create a new admin account"""
        try:
            newAdmin = cls(**details)
            with current_app.app_context():
                db.session.add(newAdmin)
                db.session.commit()
            return True
        except:
            return False
    