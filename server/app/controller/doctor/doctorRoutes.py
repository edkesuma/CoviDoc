# Libraries
from datetime import datetime
from typing import Dict, Union
import uuid
from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
import os

# Local dependencies
from app.model import Doctor
from flask import current_app
from app.controller.authentication import role_required
from .utils import hashPassword, allowed_file, extractExtension

router = Blueprint("doctor", __name__)

@router.route("/updateDoctor", methods=["PATCH"])
@jwt_required()
@role_required(["Doctor"])
def updateDoctor() -> Dict[str, Union[str, int]]:
    """Doctor updates their doctor profile"""
    fieldsToUpdate = {
        "name": request.form.get("name"),
        "email": request.form.get("email"),
        "phone": request.form.get("phone"),
        "dob": request.form.get("dob"),
        "gender": request.form.get("gender"),
        "specialization": request.form.get("specialization"),
    }

    # Remove fields that are None
    fieldsToUpdate = {k: v for k, v in fieldsToUpdate.items() if v is not None}

    # Update profile picture if included in the request
    if "profilePicture" in request.files:
        profilePicture = request.files["profilePicture"]
        if profilePicture and allowed_file(profilePicture.filename): # type: ignore
            doctorId = get_jwt_identity()
            extension = extractExtension(profilePicture.filename) # type: ignore
            filename = secure_filename(f"PP-{doctorId}.{extension}") # type: ignore
            profilePictureUrl = os.path.join(current_app.config["PROFILE_PICTURE_UPLOAD_FOLDER"], filename)
            profilePicture.save(profilePictureUrl)
            fieldsToUpdate["profilePictureUrl"] = profilePictureUrl
        else:
            return {"status code": 400, "message": "Invalid file type"}

    # Convert dob to datetime if it exists
    if "dob" in fieldsToUpdate:
        fieldsToUpdate["dob"] = datetime.strptime(fieldsToUpdate["dob"], "%Y-%m-%d") # type: ignore

    returnedBool, message = Doctor.updateDoctor(get_jwt_identity(), fieldsToUpdate) # type: ignore
    if returnedBool:
        return {"status code": 200, "success": returnedBool, "message": message}
    else:
        return {"status code": 400, "success": returnedBool, "message": message}

@router.route("/changeDoctorPassword", methods=["PATCH"])
@jwt_required()
@role_required(["Doctor"])
def changeDoctorPassword() -> Dict[str, Union[str, int]]:
    """Change a doctor's password"""
    returnedBool, message = Doctor.changePassword(get_jwt_identity(), request.json.get("currentPassword"), request.json.get("newPassword"))
    if returnedBool:
        return {"status code": 200, "success": returnedBool, "message": message}
    else:
        return {"status code": 400, "success": returnedBool, "message": message}
    
@router.route("/deleteOwnDoctorAccount", methods=["DELETE"])
@jwt_required()
@role_required(["Doctor"])
def deleteOwnDoctorAccount() -> Dict[str, Union[str, int]]:
    """Delete a doctor account (By the doctor themselves)"""
    returnedBool, message = Doctor.deleteOwnDoctorAccount(get_jwt_identity(), request.json.get("password"))
    if returnedBool:
        return {"status code": 200, "success": returnedBool, "message": message}
    else:
        return {"status code": 400, "success": returnedBool, "message": message}