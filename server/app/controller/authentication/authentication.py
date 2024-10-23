# Libraries
from typing import Dict, Union
from flask_jwt_extended import verify_jwt_in_request, get_jwt, jwt_required, create_access_token, decode_token, get_jwt_identity
from flask import Blueprint, request, url_for, current_app
from flask_mail import Message
import datetime

# Local dependencies
from app.extensions import bcrypt, mail
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
    
    # Additional claims
    additionalClaims = {
        "email": user.email,
        "name": user.name,
        "id": user.id,
        "role": userType,
    }

    if userType != "System Admin":
        additionalClaims["profilePicture"] = user.profilePictureUrl

    # Generate access token
    access_token = create_access_token(
        identity=user.id, 
        additional_claims=additionalClaims)
    
    return {"token": access_token}

@router.route("/verifyToken", methods=["GET"])
@jwt_required()
@role_required(["Doctor", "Patient", "System Admin"])
def verifyToken():
    """Verify token"""
    verify_jwt_in_request()
    claims = get_jwt()
    return {"message": "Valid token", "role": claims["role"], "success": True}

@router.route("/resetPasswordEmail", methods=["POST"])
def sendResetPasswordEmail():
    """Send reset password email"""
    json = request.get_json()
    email = json.get("email")

    # Query for existing user
    user = Patient.query.filter_by(email=email).first()

    if not user:
        return {"status code": 400, "message": "User not found", "success": False}
    
    # Send email
    token = create_access_token(identity=email, additional_claims={"resetPassword": True}, expires_delta=datetime.timedelta(minutes=10))
    body = f"""
		Dear sir/madam,
		You have requested our 'Forget Password' feature, click the following link to reset your password.
        You have 10 minutes to reset your password before this link expires.
        {current_app.config["CLIENT_SERVER_URL"]}/login/resetPassword/{token}
		
		Best regards,
		CoviDoc.
		"""
    msg = Message(subject="Reset Password for CoviDoc", 
                recipients=[email], 
                body=body,
                sender=current_app.config["MAIL_USERNAME"],
                )
    mail.send(msg)

    return {"status code": 200, "message": "Password reset email sent successfully", "success": True}

@router.route("/verifyResetPasswordToken", methods=["POST"])
def verifyResetPasswordToken():
    """Verify reset password token"""
    json = request.get_json()
    token = json.get("resetToken")
    decodedToken = decode_token(token)
    email = decodedToken["sub"]
    # Check if token is for reset password
    if not decodedToken["resetPassword"]:
        return {"status code": 400, "message": "Invalid token", "success": False}
    # Check if email exists for token decoded
    user = Patient.query.filter_by(email=email).first()
    if not user:
        return {"status code": 400, "message": "User not found", "success": False}

    return {"status code": 200, "message": "Valid token", "email": email, "success": True}

@router.route("/resetPassword", methods=["PATCH"])
@jwt_required()
def resetPassword():
    """Reset password"""
    json = request.get_json()
    email = get_jwt_identity()
    newPassword = json.get("newPassword")

    # Reset password
    success, message = Patient.resetPassword(email, newPassword)
    
    if success:
        return {"status code": 200, "message": message, "success": success}
    else:
        return {"status code": 400, "message": message, "success": success}