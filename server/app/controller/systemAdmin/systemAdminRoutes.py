# Libraries
from datetime import datetime
from typing import Dict, Union
import uuid
from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
import os

# Local dependencies
from app.model import Doctor, Patient
from flask import current_app
from app.controller.authentication import role_required
from .utils import hashPassword, allowed_file, extractExtension, uploadToGoogleCloud, deleteFromGoogleCloud

router = Blueprint("systemAdmin", __name__)

# DOCTOR MANAGEMENT

@router.route("/createDoctor", methods=["PUT"])
@jwt_required()
@role_required(["System Admin"])
def createDoctor() -> Dict[str, Union[str, int]]:
    """Create a new doctor account"""
    doctorId = f"D{str(uuid.uuid4().hex)}"
    if "profilePicture" in request.files:
        profilePicture = request.files["profilePicture"]
        # Check that extension is image type
        if profilePicture and allowed_file(profilePicture.filename): # type: ignore
            extension = extractExtension(profilePicture.filename) # type: ignore
            filename = secure_filename(f"{doctorId}.{extension}") # type: ignore
            destinationBlobName = f"profilePictures/{filename}"
            profilePictureUrl = uploadToGoogleCloud(current_app.config['BUCKET_NAME'], destinationBlobName, profilePicture)
        else:
            return {"status code": 400, "message": "Invalid file type"}
    else:
        profilePictureUrl = ""
    # Return error if missing fields
    if not all([request.form.get("name"), request.form.get("email"), request.form.get("password"), request.form.get("phone"), request.form.get("dob"), request.form.get("gender"), request.form.get("specialization")]):
        return {"status code": 400, "message": "Missing fields"}
    
    # Create
    doctorJson = {
        "id": doctorId,
        "name": request.form.get("name"),
        "email": request.form.get("email"),
        "password": hashPassword(request.form.get("password")), # type: ignore
        "phone": request.form.get("phone"),
        "dob": datetime.strptime(request.form.get("dob"), "%d/%m/%Y"), # type: ignore
        "gender": request.form.get("gender"),
        "specialization": request.form.get("specialization"),
        "profilePictureUrl": profilePictureUrl
    }
    returnedBool, message = Doctor.createDoctor(doctorJson)
    if returnedBool:
        return {"status code": 200, "success": returnedBool, "message": message}
    else:
        return {"status code": 400, "success": returnedBool, "message": message}

# can be for doc as well but ignore first
@router.route("/updateDoctor", methods=["PATCH"])
@jwt_required()
@role_required(["System Admin"])
def updateDoctor() -> Dict[str, Union[str, int]]:
    """Update a doctor's profile"""
    fieldsToUpdate = {
        "name": request.form.get("name"),
        "email": request.form.get("email"),
        "password": request.form.get("password"),
        "phone": request.form.get("phone"),
        "dob": request.form.get("dob"),
        "gender": request.form.get("gender"),
        "specialization": request.form.get("specialization")
    }

    # Remove fields that are None
    fieldsToUpdate = {k: v for k, v in fieldsToUpdate.items() if v is not None}

    # Update profile picture if included in the request
    if "profilePicture" in request.files:
        profilePicture = request.files["profilePicture"]
        if profilePicture and allowed_file(profilePicture.filename): # type: ignore
            extension = extractExtension(profilePicture.filename) # type: ignore
            filename = secure_filename(f"{request.form.get('doctorId')}.{extension}") # type: ignore
            destinationBlobName = f"profilePictures/{filename}"
            profilePictureUrl = uploadToGoogleCloud(current_app.config['BUCKET_NAME'], destinationBlobName, profilePicture)
            fieldsToUpdate["profilePictureUrl"] = profilePictureUrl
        else:
            return {"status code": 400, "message": "Invalid file type"}

    # Convert dob to datetime if it exists
    if "dob" in fieldsToUpdate:
        fieldsToUpdate["dob"] = datetime.strptime(fieldsToUpdate["dob"], "%d/%m/%Y") # type: ignore
    if "password" in fieldsToUpdate:
        fieldsToUpdate["password"] = hashPassword(request.form.get("password")) # type: ignore

    returnedBool, message = Doctor.updateDoctor(request.form.get("doctorId"), fieldsToUpdate) # type: ignore
    if returnedBool:
        return {"status code": 200, "success": returnedBool, "message": message}
    else:
        return {"status code": 400, "success": returnedBool, "message": message}

@router.route("/deleteDoctor", methods=["DELETE"])
@jwt_required()
@role_required(["System Admin"])
def deleteDoctor() -> Dict[str, Union[str, int]]:
    """Delete a doctor account"""
    deleteFromGoogleCloud(current_app.config['BUCKET_NAME'], f"profilePictures/{request.json.get('doctorId')}")
    returnedBool, message = Doctor.deleteDoctor(request.json.get("doctorId"))
    if returnedBool:
        return {"status code": 200, "success": returnedBool, "message": message}
    else:
        return {"status code": 400, "success": returnedBool, "message": message}
    
# Can be for doctor also but removed temporarily
@router.route("/queryDoctor", methods=["POST"])
@jwt_required()
@role_required(["System Admin"])
def queryDoctor() -> Dict[str, Union[str, int]]:
    """Query a doctor account"""
    doctor = Doctor.queryDoctor(request.json.get("doctorId"))
    if doctor:
        return {"status code": 200, "success": True, "data": doctor.serialize()} # type: ignore
    else:
        return {"status code": 400, "success": False, "message": "Doctor account not found"}
    
@router.route("/queryAllDoctors", methods=["GET"])
@jwt_required()
@role_required(["System Admin"])
def queryAllDoctors() -> Dict[str, Union[str, int]]:
    """Query all doctor accounts"""
    listOfDoctors = list()
    for doctor in Doctor.queryAllDoctors():
        listOfDoctors.append(doctor.serialize())
    return {"status code": 200, "success": True, "data": listOfDoctors} # type: ignore

# PATIENT MANAGEMENT

@router.route("/createPatient", methods=["PUT"])
@jwt_required()
@role_required(["System Admin"])
def createPatient() -> Dict[str, Union[str, int]]:
    """Create a new patient account"""
    patientId = f"P{str(uuid.uuid4().hex)}"
    profilePictureUrl = ""
    
    if "profilePicture" in request.files:
        profilePicture = request.files["profilePicture"]
        # Check that extension is image type
        if profilePicture and allowed_file(profilePicture.filename):  # type: ignore
            extension = extractExtension(profilePicture.filename)  # type: ignore
            filename = secure_filename(f"{patientId}.{extension}")  # type: ignore
            destinationBlobName = f"profilePictures/{filename}"
            profilePictureUrl = uploadToGoogleCloud(current_app.config['BUCKET_NAME'], destinationBlobName, profilePicture)
        else:
            return {"status code": 400, "message": "Invalid file type"}
    
    # Return error if missing fields
    if not all([request.form.get("name"), request.form.get("email"), request.form.get("password"), request.form.get("phone"), request.form.get("dob"), request.form.get("gender")]):
        return {"status code": 400, "message": "Missing fields"}
    
    # Create
    patientJson = {
        "id": patientId,
        "name": request.form.get("name"),
        "email": request.form.get("email"),
        "password": hashPassword(request.form.get("password")),  # type: ignore
        "phone": request.form.get("phone"),
        "dob": datetime.strptime(request.form.get("dob"), "%d/%m/%Y"),  # type: ignore
        "gender": request.form.get("gender"),
        "allergies": request.form.get("allergies"),
        "medicalHistory": request.form.get("medicalHistory"),
        "profilePictureUrl": profilePictureUrl
    }
    returnedBool, message = Patient.createPatient(patientJson)
    if returnedBool:
        return {"status code": 200, "success": returnedBool, "message": message}
    else:
        return {"status code": 400, "success": returnedBool, "message": message}
    
@router.route("/updatePatient", methods=["PATCH"])
@jwt_required()
@role_required(["System Admin"])
def updatePatient() -> Dict[str, Union[str, int]]:
    """Update a patient's profile"""
    fieldsToUpdate = {
        "name": request.form.get("name"),
        "email": request.form.get("email"),
        "password": request.form.get("password"),
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
            extension = extractExtension(profilePicture.filename) # type: ignore
            filename = secure_filename(f"{request.form.get('patientId')}.{extension}") # type: ignore
            destinationBlobName = f"profilePictures/{filename}"
            profilePictureUrl = uploadToGoogleCloud(current_app.config['BUCKET_NAME'], destinationBlobName, profilePicture)
            fieldsToUpdate["profilePictureUrl"] = profilePictureUrl
        else:
            return {"status code": 400, "message": "Invalid file type"}

    # Convert dob to datetime if it exists
    if "dob" in fieldsToUpdate:
        fieldsToUpdate["dob"] = datetime.strptime(fieldsToUpdate["dob"], "%d/%m/%Y") # type: ignore
    if "password" in fieldsToUpdate:
        fieldsToUpdate["password"] = hashPassword(request.form.get("password")) # type: ignore

    returnedBool, message = Patient.updatePatient(request.form.get("patientId"), fieldsToUpdate) # type: ignore
    if returnedBool:
        return {"status code": 200, "success": returnedBool, "message": message}
    else:
        return {"status code": 400, "success": returnedBool, "message": message}

@router.route("/deletePatient", methods=["DELETE"])
@jwt_required()
@role_required(["System Admin"])
def deletePatient() -> Dict[str, Union[str, int]]:
    """Delete a patient account (Only for System Admin)"""
    deleteFromGoogleCloud(current_app.config['BUCKET_NAME'], f"profilePictures/{request.json.get('patientId')}")
    returnedBool, message = Patient.deletePatient(request.json.get("patientId"))
    if returnedBool:
        return {"status code": 200, "success": returnedBool, "message": message}
    else:
        return {"status code": 400, "success": returnedBool, "message": message}
    
@router.route("/queryPatient", methods=["POST"])
@jwt_required()
@role_required(["System Admin"])
def queryPatient() -> Dict[str, Union[str, int]]:
    """Query a patient account"""
    patient = Patient.queryPatient(request.json.get("patientId"))
    if patient:
        return {"status code": 200, "success": True, "data": patient.serialize()} # type: ignore
    else:
        return {"status code": 400, "success": False, "message": "Patient account not found"}

@router.route("/queryAllPatients", methods=["GET"])
@jwt_required()
@role_required(["System Admin"])
def queryAllPatients() -> Dict[str, Union[str, int]]:
    """Query all patient accounts"""
    listOfPatients = list()
    for patient in Patient.queryAllPatients():
        listOfPatients.append(patient.serialize())
    return {"status code": 200, "success": True, "data": listOfPatients} # type: ignore
