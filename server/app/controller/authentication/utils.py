# Libraries
from flask_jwt_extended import verify_jwt_in_request, get_jwt
from functools import wraps  # type: ignore

# Note: Valid roles are "Doctor", "Patient", and "System Admin"
def role_required(allowed_roles):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            if claims["role"] in allowed_roles:
                return fn(*args, **kwargs)
            else:
                return {"message": "Wrong role"}, 403
        return decorator
    return wrapper