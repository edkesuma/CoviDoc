# Libraries
from datetime import datetime
from typing import Dict, Union
import uuid
from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
import os

# Local dependencies
from app.model import Patient, Consultation, Report, Doctor
from flask import current_app
from app.controller.authentication import role_required
from .utils import hashPassword, allowed_file, extractExtension, uploadToGoogleCloud

router = Blueprint("patient", __name__)

@router.route("/getPatientProfile", methods=["GET"])
@jwt_required()
@role_required(["Patient"])
def getPatientProfile() -> Dict[str, Union[str, int]]:
    """Get patient profile"""
    patient = Patient.queryPatient(get_jwt_identity())
    if patient:
        return {"status code": 200, "patient": patient.serialize()} # type: ignore
    else:
        return {"status code": 400, "message": "Patient not found"}

@router.route("/registerPatient", methods=["PUT"])
def registerPatient() -> Dict[str, Union[str, int]]:
    """Patient registers new patient account"""
    patientId = f"P{str(uuid.uuid4().hex)}"
    
    # Return error if missing fields
    if not all([request.form.get("name"), request.form.get("email"), request.form.get("password"), request.form.get("phone"), request.form.get("dob"), request.form.get("gender")]):
        return {"status code": 400, "message": "Missing fields"}
    
    # Create
    patientJson = {
        "id": patientId,
        "name": request.form.get("name"),
        "email": request.form.get("email"),
        "password": hashPassword(request.form.get("password")), # type: ignore
        "phone": request.form.get("phone"),
        "dob": datetime.strptime(request.form.get("dob"), "%d/%m/%Y"),  # type: ignore
        "gender": request.form.get("gender")
    }
    returnedBool, message = Patient.createPatient(patientJson)
    if returnedBool:
        return {"status code": 200, "success": returnedBool, "message": message}
    else:
        return {"status code": 400, "success": returnedBool, "message": message}

@router.route("/updatePatient", methods=["PATCH"])
@jwt_required()
@role_required(["Patient"])
def updatePatient() -> Dict[str, Union[str, int]]:
    """Patient updates their patient profile"""
    fieldsToUpdate = {
        "name": request.form.get("name"),
        "email": request.form.get("email"),
        "phone": request.form.get("phone"),
        "dob": request.form.get("dob"),
        "gender": request.form.get("gender"),
        "allergies": request.form.get("allergies"),
        "medicalHistory": request.form.get("medicalHistory")
    }

    # Remove fields that are None
    fieldsToUpdate = {k: v for k, v in fieldsToUpdate.items() if v is not None}

    # Update profile picture if included in the request
    if "profilePicture" in request.files:
        profilePicture = request.files["profilePicture"]
        if profilePicture and allowed_file(profilePicture.filename): # type: ignore
            patientId = get_jwt_identity()
            extension = extractExtension(profilePicture.filename) # type: ignore
            filename = secure_filename(f"{patientId}.{extension}") # type: ignore
            destinationBlobName = f"profilePictures/{filename}"
            profilePictureUrl = uploadToGoogleCloud(current_app.config['BUCKET_NAME'], destinationBlobName, profilePicture)
            fieldsToUpdate["profilePictureUrl"] = profilePictureUrl
        else:
            return {"status code": 400, "message": "Invalid file type"}

    # Convert dob to datetime if it exists
    if "dob" in fieldsToUpdate:
        fieldsToUpdate["dob"] = datetime.strptime(fieldsToUpdate["dob"], "%d/%m/%Y") # type: ignore

    returnedBool, message = Patient.updatePatient(get_jwt_identity(), fieldsToUpdate) # type: ignore
    if returnedBool:
        return {"status code": 200, "success": returnedBool, "message": message}
    else:
        return {"status code": 400, "success": returnedBool, "message": message}

@router.route("/changePatientPassword", methods=["PATCH"])
@jwt_required()
@role_required(["Patient"])
def changePatientPassword() -> Dict[str, Union[str, int]]:
    """Change a patient's password"""
    returnedBool, message = Patient.changePassword(get_jwt_identity(), request.json.get("currentPassword"), request.json.get("newPassword"))
    if returnedBool:
        return {"status code": 200, "success": returnedBool, "message": message}
    else:
        return {"status code": 400, "success": returnedBool, "message": message}
    
@router.route("/deleteOwnPatientAccount", methods=["DELETE"])
@jwt_required()
@role_required(["Patient"])
def deleteOwnPatientAccount() -> Dict[str, Union[str, int]]:
    """Delete a patient account (By the patient themselves)"""
    returnedBool, message = Patient.deleteOwnPatientAccount(get_jwt_identity(), request.json.get("password"))
    if returnedBool:
        return {"status code": 200, "success": returnedBool, "message": message}
    else:
        return {"status code": 400, "success": returnedBool, "message": message}
    
@router.route("/queryConsultationsUnderPatient", methods=["GET"])
@jwt_required()
@role_required(["Patient"])
def queryConsultationsUnderPatient() -> Dict[str, Union[str, int, list]]:
    """Query consultations under a patient"""
    patientId = get_jwt_identity()
    consultations = Consultation.queryAllPatientConsultations(patientId) # type: ignore
    consultationHistory = []
    for consultation in consultations:
        if Report.queryReport(consultation.reportId).classification == "Healthy":
            status = "Healthy"
        else:
            status = Report.queryReport(consultation.reportId).severity
        consultationHistory.append({
            "status": status,
            "consultationId": consultation.id,
            "doctorName": Doctor.queryDoctor(consultation.doctorId).name,
            "consultationDate": consultation.consultationDate.strftime("%d/%m/%Y")
        }) 
    return {"status code": 200, "success": True, "consultationHistory": consultationHistory}