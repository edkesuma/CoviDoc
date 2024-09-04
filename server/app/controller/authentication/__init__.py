# Libraries
from flask import Blueprint

# Local dependencies
from .authentication import router
from .utils import role_required


# Initialize Blueprint
# router = Blueprint("systemAdmin", __name__)
# router.register_blueprint(userManagementRouter, url_prefix="/userManagement")
# router.register_blueprint(user_management_router, url_prefix="/user_management")

__all__ = [
    "router", 'role_required'
]