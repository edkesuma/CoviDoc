# Libraries
from datetime import datetime
from typing import Dict, Union
import uuid
from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
import os

# Local dependencies
from app.model import Doctor, Patient, Consultation, Report
from flask import current_app
from app.controller.authentication import role_required
from .utils import allowed_file, extractExtension, uploadToGoogleCloud

router = Blueprint("doctor", __name__)

@router.route("/getDoctorProfile", methods=["GET"])
@jwt_required()
@role_required(["Doctor"])
def getDoctorProfile() -> Dict[str, Union[str, int]]:
    """Doctor gets their doctor profile"""
    doctor = Doctor.queryDoctor(get_jwt_identity())
    if doctor:
        return {"status code": 200, "doctor": doctor.serialize()} # type: ignore
    else:
        return {"status code": 400, "message": "Doctor not found"}

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
            filename = secure_filename(f"{doctorId}.{extension}") # type: ignore
            destinationBlobName = f"profilePictures/{filename}"
            profilePictureUrl = uploadToGoogleCloud(current_app.config['BUCKET_NAME'], destinationBlobName, profilePicture)
            fieldsToUpdate["profilePictureUrl"] = profilePictureUrl
        else:
            return {"status code": 400, "message": "Invalid file type"}

    # Convert dob to datetime if it exists
    if "dob" in fieldsToUpdate:
        fieldsToUpdate["dob"] = datetime.strptime(fieldsToUpdate["dob"], "%d/%m/%Y") # type: ignore

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
    
@router.route("/createConsultation", methods=["PUT"])
@jwt_required()
@role_required(["Doctor"])
def createConsultation() -> Dict[str, Union[str, int]]:
    """Doctor creates a consultation"""
    consultationId = f"C{str(uuid.uuid4().hex)}"
    consultationDetails = {
        "consultationDate": request.form.get("consultationDate"),
        "doctorId": get_jwt_identity(),
        "patientId": request.form.get("patientId"),
        "temperature": float(request.form.get("temperature")), # type: ignore
        "o2Saturation": int(request.form.get("o2Saturation")), # type: ignore
        "leukocyteCount": int(request.form.get("leukocyteCount")), # type: ignore
        "neutrophilCount": int(request.form.get("neutrophilCount")), # type: ignore
        "lymphocyteCount": int(request.form.get("lymphocyteCount")), # type: ignore
        "recentlyInIcu": bool(request.form.get("recentlyInIcu")),
        "recentlyNeededSupplementalO2": bool(request.form.get("recentlyNeededSupplementalO2")),
        "intubationPresent": bool(request.form.get("intubationPresent")),
        "consultationNotes": request.form.get("consultationNotes")
    }
    # Upload xray image to Google Cloud
    xrayImage = request.files["xrayImage"]
    if xrayImage and allowed_file(xrayImage.filename): # type: ignore
        extension = extractExtension(xrayImage.filename) # type: ignore
        filename = secure_filename(f"{consultationId}.{extension}") # type: ignore
        destinationBlobName = f"xrayImages/{filename}"
        xrayImageUrl = uploadToGoogleCloud(current_app.config['BUCKET_NAME'], destinationBlobName, xrayImage)
        consultationDetails["xrayImageUrl"] = xrayImageUrl
    else:
        return {"status code": 400, "success": False, "message": "Invalid file type"}

    returnedBool, message = Consultation.createConsultation(consultationDetails)
    if returnedBool:
        return {"status code": 200, "success": returnedBool, "message": message}
    else:
        return {"status code": 400, "success": returnedBool, "message": message}
    
@router.route("/getAIResults", methods=["PUT"])
@jwt_required()
@role_required(["Doctor"])
def getAIResults() -> Dict[str, Union[str, int]]:
    """Doctor creates initial AI classification and LLM"""
    consultationId = request.json.get("consultationId")
    returnedBool, message = Report.classifyAndLLM(consultationId)

    consultation = Consultation.queryConsultation(consultationId) # type: ignore
    report = Report.queryReport(consultation.reportId) # type: ignore

    collectedData = {
        "findings": report.getFindings(),
        "consultationInfo": consultation.serialize(),
        "patient": Patient.queryPatient(consultation.patientId).serialize(), # type: ignore
        "suggestedPrescriptions": report.prescriptions,
        "suggestedLifestyleChanges": report.lifestyleChanges
    }

    if returnedBool:
        return {"status code": 200, "success": returnedBool, "message": message, "collectedData": collectedData} # type: ignore
    else:
        return {"status code": 400, "success": returnedBool, "message": message}
    
@router.route("/getPatientDetails", methods=["GET"])
@jwt_required()
@role_required(["Doctor"])
def getPatientDetails() -> Dict[str, Union[str, int]]:
    """Get patient details"""
    patientId = request.args.get("patientId")
    patient = Patient.queryPatient(patientId) # type: ignore
    if patient:
        return {"status code": 200, "success": True, "patient": patient.serialize()} # type: ignore
    else:
        return {"status code": 400, "success": False, "message": "Patient not found"}
    
@router.route("/getPatientList", methods=["GET"])
@jwt_required()
@role_required(["Doctor"])
def getPatientList() -> Dict[str, Union[str, int, list]]:
    """Get all patients"""
    patients = Patient.queryAllPatients()
    return {"status code": 200, "success": True, "patients": [patient.serialize() for patient in patients]}

@router.route("/getPatientConsultationHistory", methods=["GET"])
@jwt_required()
@role_required(["Doctor"])
def getPatientConsultationHistory() -> Dict[str, Union[str, int, list]]:
    """Get consultation history of patient"""
    patientId = request.args.get("patientId")
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
            "viewableToPatient": Report.queryReport(consultation.reportId).viewableToPatient,
            "consultationDate": consultation.consultationDate.strftime("%Y-%m-%d %H:%M:%S")
        }) 
    return {"status code": 200, "success": True, "consultationHistory": consultationHistory}

@router.route("/getSingleConsultation", methods=["GET"])
@jwt_required()
@role_required(["Doctor"])
def getSingleConsultation() -> Dict[str, Union[str, int, bool]]:
    """Get single consultation"""
    consultationId = request.args.get("consultationId")
    consultation = Consultation.queryConsultation(consultationId) # type: ignore
    data = {
        "consultationId": consultation.id,
        "consultationDate": consultation.consultationDate.strftime("%Y-%m-%d %H:%M:%S"),
        "doctorName": Doctor.queryDoctor(consultation.doctorId).name,
        "classification": Report.queryReport(consultation.reportId).classification,
        "viewableToPatient": Report.queryReport(consultation.reportId).viewableToPatient,
        "reportUrl": Report.queryReport(consultation.reportId).covidReportUrl
    }

    if Report.queryReport(consultation.reportId).classification == "Healthy":
        data["status"] = "Healthy"
    else:
        data["status"] = Report.queryReport(consultation.reportId).severity
        
    if consultation:
        return {"status code": 200, "success": True, "consultation": data} # type: ignore
    else:
        return {"status code": 400, "success": False, "message": "Consultation not found"}
    
@router.route("/updateViewableToPatient", methods=["PATCH"])
@jwt_required()
@role_required(["Doctor"])
def updateViewableToPatient() -> Dict[str, Union[str, int]]:
    """Update report viewability"""
    consultationId = request.json.get("consultationId")
    viewableToPatient = bool(request.json.get("viewableToPatient"))
    reportId = Consultation.queryConsultation(consultationId).reportId
    returnedBool, message = Report.updateViewableToPatient(reportId, viewableToPatient)
    if returnedBool:
        return {"status code": 200, "success": returnedBool, "message": message}
    else:
        return {"status code": 400, "success": returnedBool, "message": message}
    
@router.route("/updatePatientState", methods=["PATCH"])
@jwt_required()
@role_required(["Doctor"])
def updatePatientState() -> Dict[str, Union[str, int]]:
    """Update patient state"""
    patientId = request.json.get("patientId")
    currentState = request.json.get("currentState")
    returnedBool, message = Patient.updatePatientState(patientId, currentState)
    if returnedBool:
        return {"status code": 200, "success": returnedBool, "message": message}
    else:
        return {"status code": 400, "success": returnedBool, "message": message}