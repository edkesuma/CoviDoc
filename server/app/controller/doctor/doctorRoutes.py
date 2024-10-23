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
from .utils import allowed_file, extractExtension, uploadToGoogleCloud, deleteFromGoogleCloud

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
    deleteFromGoogleCloud(current_app.config['BUCKET_NAME'], f"profilePictures/{get_jwt_identity()}")
    returnedBool, message = Doctor.deleteOwnDoctorAccount(get_jwt_identity(), request.json.get("password"))
    if returnedBool:
        return {"status code": 200, "success": returnedBool, "message": message}
    else:
        return {"status code": 400, "success": returnedBool, "message": message}
    
@router.route("/getXrayHistory", methods=["GET"])
@jwt_required()
@role_required(["Doctor"])
def getXrayHistory() -> Dict[str, Union[str, int, list]]:
    """Doctor gets xray history"""
    patientId = request.args.get("patientId")
    if not patientId:
        return {"status code": 400, "success": False, "message": "Patient ID not provided"}
    xrayHistory = Report.getXrayHistory(patientId=patientId)
    return {"status code": 200, "success": True, "data": xrayHistory}
    
@router.route("/generateClassification", methods=["PUT"])
@jwt_required()
@role_required(["Doctor"])
def generateClassification() -> Dict[str, Union[str, int, dict]]:
    """Doctor classifies an xray"""
    consultationId = f"C{str(uuid.uuid4().hex)}"
    # Upload xray image to Google Cloud
    xrayImage = request.files["xrayImage"]
    if xrayImage and allowed_file(xrayImage.filename): # type: ignore
        extension = extractExtension(xrayImage.filename) # type: ignore
        filename = secure_filename(f"{consultationId}.{extension}") 
        destinationBlobName = f"xrayImages/{filename}"
        xrayImageUrl = uploadToGoogleCloud(current_app.config['BUCKET_NAME'], destinationBlobName, xrayImage)
    else:
        return {"status code": 400, "success": False, "message": "Invalid file type"}
    
    consultationDetails = {
        "consultationId": consultationId,
        "doctorId": get_jwt_identity(),
        "patientId": request.form.get("patientId"),
        "xrayImageUrl": xrayImageUrl
    }
    
    _, _, consultationId = Consultation.createConsultation(consultationDetails)
    returnedBool, message, data = Report.classifyXray(consultationId)
    stageUpdated = Consultation.updateWorkflowStage(consultationId, "CLASSIFIED")
    if returnedBool:
        return {"status code": 200, "success": returnedBool, "message": message, "data": data}
    else:
        return {"status code": 400, "success": returnedBool, "message": message}
    
@router.route("/updateFindings", methods=["PATCH"])
@jwt_required()
@role_required(["Doctor"])
def updateFindings() -> Dict[str, Union[str, int]]:
    """Doctor updates findings"""
    consultationId = request.json.get("consultationId")
    # Get current report id
    reportId = Consultation.queryConsultation(consultationId).reportId
    # Structure findings from json to dictionary
    updatedFindings = {
        "classification": request.json.get("classification"),
        "classificationConfidence": request.json.get("classificationConfidence"),
        "severity": request.json.get("severity"),
        "severityConfidence": request.json.get("severityConfidence")
    }
    returnedBool, message = Report.updateFindings(reportId, updatedFindings)
    stageUpdated = Consultation.updateWorkflowStage(consultationId, "FIXED_PREDICTION")
    if returnedBool:
        return {"status code": 200, "success": returnedBool, "message": message}
    else:
        return {"status code": 400, "success": returnedBool, "message": message}
    
@router.route("/updateConsultation", methods=["PATCH"])
@jwt_required()
@role_required(["Doctor"])
def updateConsultation() -> Dict[str, Union[str, int]]:
    """Doctor updates consultation"""
    consultationId = request.json.get("consultationId")
    consultationDetails = {
        "consultationDate": datetime.strptime(request.json.get("consultationDate"), "%d/%m/%Y"),
        "temperature": request.json.get("temperature"),
        "o2Saturation": request.json.get("o2Saturation"),
        "recentlyInIcu": request.json.get("recentlyInIcu"),
        "recentlyNeededSupplementalO2": request.json.get("recentlyNeededSupplementalO2"),
        "intubationPresent": request.json.get("intubationPresent"),
        "consultationNotes": request.json.get("consultationNotes")
    }
    returnedBool, message = Consultation.updateConsultation(consultationId, consultationDetails)
    stageUpdated = Consultation.updateWorkflowStage(consultationId, "LLM_PREDICTED")
    if returnedBool:
        return {"status code": 200, "success": returnedBool, "message": message}
    else:
        return {"status code": 400, "success": returnedBool, "message": message}
    
@router.route("/updatePrescriptionsLifestyleChanges", methods=["PATCH"])
@jwt_required()
@role_required(["Doctor"])
def updatePrescriptionsLifestyleChanges() -> Dict[str, Union[str, int]]:
    """Doctor updates prescriptions and lifestyle changes"""
    consultationId = request.json.get("consultationId")
    prescriptions = request.json.get("prescriptions")
    lifestyleChanges = request.json.get("lifestyleChanges")
    reportId = Consultation.queryConsultation(consultationId).reportId
    # print(f"Prescriptions: {prescriptions}, Lifestyle Changes: {lifestyleChanges}, Consultation ID: {consultationId}")
    returnedBool, message = Report.updatePrescriptionsLifestyleChanges(reportId, prescriptions, lifestyleChanges)
    if returnedBool:
        return {"status code": 200, "success": returnedBool, "message": message}
    else:
        return {"status code": 400, "success": returnedBool, "message": message}
    
@router.route("/generateLLMAdditionalInfo", methods=["PUT"])
@jwt_required()
@role_required(["Doctor"])
def generateLLMAdditionalInfo() -> Dict[str, Union[str, int]]:
    """Doctor generates LLM additional info"""

    # Get consultation object and report id
    consultationId = request.json.get("consultationId")
    consultation = Consultation.queryConsultation(consultationId)
    reportId = consultation.reportId

    # Get patient object
    patient = Patient.queryPatient(consultation.patientId)

    returnedBool, message, data = Report.generateLLMAdditionalInfo(reportId, patient=patient, consultation=consultation)
    if returnedBool:
        return {"status code": 200, "success": returnedBool, "message": message, "data": data} # type: ignore
    else:
        return {"status code": 400, "success": returnedBool, "message": message}

@router.route("/generateReport", methods=["PUT"])
@jwt_required()
@role_required(["Doctor"])
def generateReport() -> Dict[str, Union[str, int]]:
    """Doctor generates a report"""
    consultationId = request.json.get("consultationId")
    consultation = Consultation.queryConsultation(consultationId)
    returnedBool, message = Report.generateReport(consultation)
    stageUpdated = Consultation.updateWorkflowStage(consultationId, "COMPLETED")
    if returnedBool:
        return {"status code": 200, "success": returnedBool, "message": message}
    else:
        return {"status code": 400, "success": returnedBool, "message": message}

@router.route("/viewReportPage", methods=["GET"])
@jwt_required()
@role_required(["Doctor"])
def viewReportPage() -> Dict[str, Union[str, int, list]]:
    """Doctor views a report page"""
    consultationId = request.args.get("consultationId")
    if not consultationId:
        return {"status code": 400, "success": False, "message": "Consultation ID not provided"}
    consultation = Consultation.queryConsultation(consultationId)
    report = Report.queryReport(consultation.reportId)
    if report.classification == "Healthy":
        status = "Healthy"
    else:
        status = report.severity
    data = {
        "consultationId": consultation.id,
        "consultationDate": consultation.consultationDate.strftime("%d/%m/%Y"),
        "doctorName": Doctor.queryDoctor(consultation.doctorId).name,
        "patientView": report.viewableToPatient,
        "classification": report.classification,
        "status": status,
        "reportUrl": report.reportUrl
    }
    return {"status code": 200, "success": True, "data": data} # type: ignore
    
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
    print(f"Consultations: {consultations}")
    if consultations == []:
        return {"status code": 200, "success": True, "message": "Patient has no consultations", "consultationHistory": []}
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
            "consultationDate": consultation.consultationDate.strftime("%d/%m/%Y"),
            "ConsultationNotes": consultation.consultationNotes,
            "workflowStage": consultation.workflowStage
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
        "consultationDate": consultation.consultationDate.strftime("%d/%m/%Y"),
        "doctorName": Doctor.queryDoctor(consultation.doctorId).name,
        "classification": Report.queryReport(consultation.reportId).classification,
        "viewableToPatient": Report.queryReport(consultation.reportId).viewableToPatient,
        "reportUrl": Report.queryReport(consultation.reportId).reportUrl
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
    
@router.route("/getWorkflowItems", methods=["GET"])
@jwt_required()
@role_required(["Doctor"])
def getWorkflowItems():
    """Get workflow items depending on the stage"""
    consultationId = request.args.get("consultationId")
    if not consultationId:
        return {"status code": 400, "message": "Consultation ID not provided"}
    consultation = Consultation.queryConsultation(consultationId)
    report = Report.queryReport(consultation.reportId)
    if consultation.workflowStage in ["CLASSIFIED", "FIXED_PREDICTION", "LLM_PREDICTED"]:
        data = {
            'consultationId': consultationId,
            'classification': report.classification,
            'classificationConfidence': report.classificationConfidence,
            'severity': report.severity,
            'severityConfidence': report.severityConfidence,
            'xrayImageUrl':consultation.xrayImageUrl,
            'highlightedXrayImage':consultation.highlightedXrayImageUrl,
            'consultationData':consultation.consultationDate,
            'temperature':consultation.temperature,
            'O2':consultation.o2Saturation,
            'ICU':consultation.recentlyInIcu,
            'supplemental':consultation.recentlyNeededSupplementalO2,
            'intubation':consultation.intubationPresent,
            'note':consultation.consultationNotes
        }
        return {"status code": 200, "data": data}
    else:
        return {"status code": 400, "message": "Invalid workflow stage"}
    
@router.route("/getClassificationsOverTimeData", methods=["GET"])
@jwt_required()
@role_required(["Doctor"])
def getClassificationsOverTimeData() -> Dict[str, Union[str, int, dict]]:
    """Get classification data over time"""
    data = Consultation.getClassificationsOverTimeData() # type: ignore
    return {"status code": 200, "data": data}


# @router.route("/getDoctorStatistics", methods=["GET"])
# @jwt_required()
# @role_required(["Doctor"])
# def getDoctorStatistics() -> Dict[str, Union[str, int, dict]]:
#     """Get statistics for the doctor"""
#     doctorId = get_jwt_identity()
#     statistics = Doctor.getStatistics(doctorId)  # Assuming this method exists in the Doctor model
#     if statistics:
#         return {"status code": 200, "success": True, "data": statistics}
#     else:
#         return {"status code": 400, "success": False, "message": "Statistics not found"}


# Visualization

@router.route("/getSymptomPrevalence", methods=["GET"])
@jwt_required()
@role_required(["Doctor"])
def getSymptomPrevalence() -> Dict[str, Union[str, int, list]]:
    """Get symptom prevalence matrix for all patients"""
    try:
        # Fetch all patients
        patients = Patient.queryAllPatients()
        patientsArray = [patient.serialize() for patient in patients]
        
        # Fetch consultation history for all patients
        consultationPromises = []
        for patient in patients:
            consultations = Consultation.queryAllPatientConsultations(patient.id)
            consultationPromises.append({
                "patientId": patient.id,
                "consultations": [consultation.serialize() for consultation in consultations]
            })
        
        # Extract all unique symptoms
        uniqueSymptomsSet = set()
        for consultationData in consultationPromises:
            consultations = consultationData["consultations"]
            for consultation in consultations:
                if consultation["consultationNotes"]:
                    symptoms = consultation["consultationNotes"].split(", ")
                    uniqueSymptomsSet.update([symptom.strip() for symptom in symptoms])
        
        uniqueSymptoms = sorted(uniqueSymptomsSet)
        
        # Build the symptom matrix for each patient
        symptomMatrix = []
        for consultationData in consultationPromises:
            consultations = consultationData["consultations"]
            patientSymptoms = set()
            
            for consultation in consultations:
                if consultation["consultationNotes"]:
                    symptoms = consultation["consultationNotes"].split(", ")
                    patientSymptoms.update([symptom.strip() for symptom in symptoms])
            
            # Create a binary vector for symptom presence
            symptomPresence = [1 if symptom in patientSymptoms else 0 for symptom in uniqueSymptoms]
            symptomMatrix.append(symptomPresence)

        return {
            "status code": 200,
            "success": True,
            "patients": patientsArray,
            "symptomCategories": uniqueSymptoms,
            "symptomData": symptomMatrix
        }
    
    except Exception as e:
        return {"status code": 500, "success": False, "message": str(e)}





@router.route("/getAgeDistribution", methods=["GET"])
@jwt_required()
@role_required(["Doctor"])
def getAgeDistribution() -> Dict[str, Union[str, int, dict]]:
    """Get age distribution of all patients"""
    try:
        # Fetch all patients
        patients = Patient.queryAllPatients()
        
        # Initialize age group counters
        ageGroups = {
            "0-18": 0,
            "19-35": 0,
            "36-50": 0,
            "51-65": 0,
            "66-80": 0,
            "81-100": 0,
        }

        # Process age distribution
        for patient in patients:
            patient_data = patient.serialize()  # Serialize the patient data to get 'age'
            age = patient_data.get('age')  # Access the serialized 'age' field
            
            if age is not None:  # Ensure age is available
                if age <= 18:
                    ageGroups["0-18"] += 1
                elif age <= 35:
                    ageGroups["19-35"] += 1
                elif age <= 50:
                    ageGroups["36-50"] += 1
                elif age <= 65:
                    ageGroups["51-65"] += 1
                elif age <= 80:
                    ageGroups["66-80"] += 1
                else:
                    ageGroups["81-100"] += 1

        # Return the age group distribution
        return {"status code": 200, "success": True, "ageGroups": ageGroups}
    
    except Exception as e:
        return {"status code": 500, "success": False, "message": str(e)}
    













@router.route("/getClassificationConfidenceCounts", methods=["GET"])
@jwt_required()
@role_required(["Doctor"])
def getClassificationConfidenceCounts() -> Dict[str, Union[str, int, dict]]:
    """Get classification confidence counts for all consultations"""
    try:
        # Fetch all patients
        patients = Patient.queryAllPatients()

        # Initialize a dictionary to hold classification confidence counts
        confidenceCounts = {}

        # Process each patient's consultation history
        for patient in patients:
            consultations = Consultation.queryAllPatientConsultations(patient.id)
            
            for consultation in consultations:
                # Fetch the associated report for each consultation
                report = Report.queryReport(consultation.reportId)
                
                if report:
                    classification_confidence = report.severity  # Assuming classificationConfidence is a field in the report

                    if classification_confidence in confidenceCounts:
                        confidenceCounts[classification_confidence] += 1
                    else:
                        confidenceCounts[classification_confidence] = 1

        # Return the classification confidence counts
        return {"status code": 200, "success": True, "confidenceCounts": confidenceCounts}
    
    except Exception as e:
        return {"status code": 500, "success": False, "message": str(e)}


@router.route("/getConsultationsByDate", methods=["GET"])
@jwt_required()
@role_required(["Doctor"])
def getConsultationsByDate() -> Dict[str, Union[str, int, dict]]:
    """Get the number of consultations grouped by date"""
    try:
        # Fetch all patients
        patients = Patient.queryAllPatients()

        # Initialize a dictionary to hold consultation counts per date
        consultationDateCounts = {}

        # Process each patient's consultation history
        for patient in patients:
            consultations = Consultation.queryAllPatientConsultations(patient.id)
            
            for consultation in consultations:
                consultation_date = consultation.consultationDate.strftime("%d-%m-%Y")
                
                # Increment the count for that date
                if consultation_date in consultationDateCounts:
                    consultationDateCounts[consultation_date] += 1
                else:
                    consultationDateCounts[consultation_date] = 1

        # Return the consultation counts by date
        return {"status code": 200, "success": True, "consultationsByDate": consultationDateCounts}
    
    except Exception as e:
        return {"status code": 500, "success": False, "message": str(e)}




@router.route("/getGenderDistribution", methods=["GET"])
@jwt_required()
@role_required(["Doctor"])
def getGenderDistribution() -> Dict[str, Union[str, int, dict]]:
    """Get gender distribution of all patients"""
    try:
        # Fetch all patients
        patients = Patient.queryAllPatients()

        # Initialize counts for each gender
        genderCounts = {"Male": 0, "Female": 0}

        # Count the genders after serializing the patient data
        for patient in patients:
            patient_data = patient.serialize()  # Ensure patient data is serialized
            gender = patient_data.get('gender')  # Get the gender field

            if gender == "Male":
                genderCounts["Male"] += 1
            elif gender == "Female":
                genderCounts["Female"] += 1

        # Return the gender distribution
        return {"status code": 200, "success": True, "genderCounts": genderCounts}
    
    except Exception as e:
        return {"status code": 500, "success": False, "message": str(e)}
# 




