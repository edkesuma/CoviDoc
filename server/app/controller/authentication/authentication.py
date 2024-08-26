# Libraries
from typing import Dict, Union
from flask_jwt_extended import verify_jwt_in_request, get_jwt, jwt_required, create_access_token
from flask import Blueprint, request

# Local dependencies
from app.extensions import bcrypt
from app.model import Doctor, Patient, SystemAdmin
from .utils import role_required

router = Blueprint("authentication", __name__)

@router.route("/login", methods=["POST"])
def login() -> Dict[str, Union[str, int]]:
    """Login to the system"""
    json = request.get_json()
    email = json.get("email")
    password = json.get("password")
    userType = json.get("userType")

    # Query user based on user type
    if userType == "Doctor":
        user = Doctor.query.filter_by(email=email).first()
    elif userType == "Patient":
        user = Patient.query.filter_by(email=email).first()
    elif userType == "System Admin":
        user = SystemAdmin.query.filter_by(email=email).first()
    else:
        return {"status code": 400, "message": "Invalid user type. Valid user types are Doctor, Patient, System Admin"}
    
    # Check if user exists and password is correct
    if not user or not bcrypt.check_password_hash(user.password, password):
        return {"status code": 401, "message": "Invalid credentials"}

    # Generate access token
    access_token = create_access_token(
        identity=user.id, 
        additional_claims={
            "role": userType,
        })
    
    return {"token": access_token}

@router.route("/verifyToken", methods=["GET"])
@jwt_required()
@role_required(["Doctor", "Patient", "System Admin"])
def verifyToken():
    """Verify token"""
    verify_jwt_in_request()
    claims = get_jwt()
    return {"message": "Valid token", "role": claims["role"]}