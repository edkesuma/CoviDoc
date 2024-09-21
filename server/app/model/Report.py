# Libraries
from flask import current_app
from typing_extensions import Self # type: ignore
from typing import Dict, Tuple
from sqlalchemy.sql import func
import uuid
import re
import json
import jinja2
from google.cloud import storage
import os
import pdfkit # type: ignore

# ML Libraries
import torch
import torch.nn as nn
import torch.nn.functional as F
from PIL import Image
from torchvision import models, transforms
import requests
from io import BytesIO
import google.generativeai as genai # type: ignore
import numpy as np

# Local dependencies
from .sqlalchemy import db
from . import Patient, Doctor, Consultation

class Report(db.Model):
    __tablename__ = "Report"
    # Attributes
    id = db.Column(db.String, primary_key=True, default=lambda: f"R{str(uuid.uuid4().hex)}")
    covidReportUrl = db.Column(db.String, nullable=True)
    classification = db.Column(db.String, nullable=True)
    confidence = db.Column(db.Float, nullable=True)
    severity = db.Column(db.String, nullable=True)
    observations = db.Column(db.String, nullable=True)
    prescriptions = db.Column(db.String, nullable=True)
    lifestyleChanges = db.Column(db.String, nullable=True)
    viewableToPatient = db.Column(db.Boolean, nullable=False, default=False)

    def serialize(self) -> dict:
        """Serialize the report object to a dictionary"""
        return {
            "reportId": self.id,
            "covidReportUrl": self.covidReportUrl,
            "classification": self.classification,
            "confidence": self.confidence,
            "severity": self.severity,
            "observations": self.observations,
            "prescriptions": self.prescriptions,
            "lifestyleChanges": self.lifestyleChanges,
            "viewableToPatient": self.viewableToPatient
        }
    
    def getFindings(self) -> dict:
        """Get the findings of the report"""
        return {
            "classification": self.classification,
            "confidence": self.confidence,
            "severity": self.severity,
            "observations": self.observations
        }
    
    @classmethod
    def queryReport(cls, id: str) -> Self:
        """Query a report by id"""
        return cls.query.filter(cls.id == id).one_or_none()
    
    @classmethod
    def classifyAndLLM(cls, consultationId: str) -> Tuple[bool, str]:
        """Create a new report"""
        # Create a blank report
        report = cls()
        db.session.add(report)

        # Get the patient, doctor and consultation objects
        consultation = Consultation.queryConsultation(consultationId)
        patient = Patient.queryPatient(consultation.patientId)
        doctor = Doctor.queryDoctor(consultation.doctorId)
        
        # Get the xray image URL
        xrayImageUrl = consultation.xrayImageUrl

        # Prediction pipeline
        classificationSuccess, classificationMessage = cls.classifyXray(report.id, xrayImageUrl)
        llmSuccess, llmMessage = cls.getLLMAdditionalInfo(report.id, xrayImageUrl, patient, doctor, consultation)

        # Update consultation with new report id
        consultation.reportId = report.id
        db.session.commit()
        
        if not classificationSuccess:
            return (False, classificationMessage)
        if not llmSuccess:
            return (False, llmMessage)
        return (True, "Classification and LLM successful.")
    
    @classmethod
    def updateViewableToPatient(cls, reportId: str, viewableToPatient: bool) -> Tuple[bool, str]:
        """Update the viewableToPatient attribute of a report"""
        report = cls.queryReport(reportId)
        report.viewableToPatient = viewableToPatient
        db.session.commit()
        return (True, "Report updated successfully.")
    
    @classmethod
    def updatePrescriptionsLifestyleChanges(cls, reportId: str, prescriptions: str, lifestyleChanges: str) -> Tuple[bool, str]:
        """Update the prescriptions and lifestyle changes of a report"""
        report = cls.queryReport(reportId)
        report.prescriptions = prescriptions
        report.lifestyleChanges = lifestyleChanges
        db.session.commit()
        return (True, "Prescriptions and lifestyle changes updated successfully.")
    
    @classmethod
    def classifyXray(cls, reportId: str, xrayImageUrl: str) -> Tuple[bool, str]:
        """Classify an x-ray image"""
        # Class labels
        class_names = ['Covid', 'Healthy', 'Other']
        # Load model architecture
        model = models.resnet50()
        # Modify the final fully connected layer to match the number of classes (3 classes: Healthy, COVID, Other)
        # and replicate the structure used during training (including Dropout)
        model.fc = nn.Sequential( # type: ignore
            nn.Dropout(0.5),  # Assuming Dropout was used during training
            nn.Linear(model.fc.in_features, 3)
        )
        # Load the trained weights from your saved model
        model_path = current_app.config["CLASSIFCATION_MODEL_PATH"]

        # Load the trained weights
        model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))

        # Set the model to evaluation mode
        model.eval()

        # Move the model to GPU if available
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        model = model.to(device)

        # Define image preprocessing (same as used during training)
        transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ])

        # Get image from URL
        response = requests.get(xrayImageUrl)
        image = Image.open(BytesIO(response.content)).convert("RGB")
        
        # Preprocess the image
        image = transform(image).unsqueeze(0)  # type: ignore # Add batch dimension

        # Move the image to the same device as the model
        image = image.to(device)
        
        # Forward pass to get predictions
        with torch.no_grad():
            output = model(image)
            confidence = F.softmax(output, dim=1)  # Get confidence (softmax probabilities)
            _, predicted_class = torch.max(output, 1)  # Get the predicted class
        
        predicted_class = class_names[predicted_class.item()] # type: ignore
        confidence = round(np.max(confidence.cpu().numpy()[0])*100, 2)

        if predicted_class == "Other": predicted_class = "Other lung infection"

        # Update the report
        report = cls.queryReport(reportId)
        report.classification = predicted_class
        report.confidence = confidence
        db.session.commit()
        return (True, "X-ray classified successfully.")
    
    @classmethod
    def getValueFromRegexedKey(cls, dictionary, word):
        pattern = re.compile(rf'(?i){word}(s)?')
        for key in dictionary:
            if pattern.match(key):
                return dictionary[key]
        return None 
    
    @classmethod
    def getValueOrFallback(cls, data, key):
        pattern = re.compile(rf'(?i){key}(s)?')
        value = cls.getValueFromRegexedKey(data, key)
        if isinstance(value, str) and not re.match(pattern, value):
            return value
        if isinstance(value, dict):
            return cls.getValueFromRegexedKey(value, key)
        return cls.getValueFromRegexedKey(value, key)
    
    @classmethod
    def stringifyJson(cls, jsonData):
        return ", ".join(f"{key}: {value}" for key, value in jsonData.items())

    @classmethod
    def getLLMAdditionalInfo(cls, reportId: str, xrayImageUrl: str, patient: Patient, doctor: Doctor, consultation: Consultation) -> Tuple[bool, str]:
        """Get additional information from LLM"""

        # Get current report object
        report = cls.queryReport(reportId)
        
        # Initialize gemini model
        genai.configure(api_key=current_app.config["GEMINI_API_KEY"])
        model = genai.GenerativeModel('gemini-1.5-flash', generation_config={"response_mime_type": "application/json"})

        # Get medical data from patient and consultation
        patientData = patient.getMedicalData()
        consultationData = consultation.getMedicalData()

        # Stringify medical data
        patientString = cls.stringifyJson(patientData)
        consultationString = cls.stringifyJson(consultationData)

        # Setup prompt
        prompt = f"""
            You are an assistant to a doctor, analyzing patient data to provide recommendations for both the patient and the treating doctor.
            The patient has been classified as having {report.classification} with a confidence level of {report.confidence} based on the X-ray image provided.

            Here is patient's metadata:
            {patientString}

            Here is the consultation details:
            {consultationString}

            Instructions:
            Based on the image, patient metadata and consultation details, generate the following.
            1. Based on the image only, what points to the existence of {report.classification} in the lungs.
            2. Provide the severity level of the patient.
            3. Offer prescriptions and lifestyle changes tailored to the patient's situation.
            {{
            'lifestyleChanges': "The following are health and lifestyle suggestions:\n- Rest and hydration are essential.\n- Breathing exercises: ...\n- Diet and nutrition: ..."
            }}
            4. **For the 'lifestyleChanges' section:**
            - Provide health and lifestyle advice tailored to the patient’s situation.
            - Include specific recommendations on rest, hydration, and over-the-counter relief options (such as pain relievers, decongestants).
            - Clearly explain when the patient should seek further medical consultation.
            - Add information on how to manage potential long COVID symptoms and offer recovery advice.
            - Use a clear, concise, friendly and accessible tone.
            - Provide 5 lifestyle change recommendations.
            - Wrap every recommendation in a {{}}
            5. **For the 'prescriptions' section:**
            - Provide a concise medical note summarizing key considerations for the doctor.
            - Suggest prescription medications that could be beneficial based on the patient's medical history.
            - Use clear and concise medical language.
            - Provide 5 prescription recommendations.
            - Wrap every recommendation in a {{}}
            
            Using this JSON schema:
                Observation = {{"observation": str}}
                Severity = {{"severity": enum("Mild", "Moderate", "Severe")}}
                Prescription = List[{{"prescriptionName": List[dosage, reason]]}}]
                LifestyleChange = List[{{"lifestyleChange": str}}]
            Return a `Tuple(Observation, Severity, Prescription, LifestyleChange)` with your responses.
            """

        # Call Gemini model
        response = model.generate_content([prompt, xrayImageUrl], safety_settings={
                'HATE': 'BLOCK_NONE',
                'HARASSMENT': 'BLOCK_NONE',
                'SEXUAL' : 'BLOCK_NONE',
                'DANGEROUS' : 'BLOCK_NONE'
            })
        
        # Parse response
        responseJson = response.text
        print(responseJson)
        print(f"Observations: {cls.getValueOrFallback(json.loads(responseJson), 'observation')}")
        print(f"Severity: {cls.getValueOrFallback(json.loads(responseJson), 'severity')}")
        parsedJson = json.loads(responseJson)
        observations = cls.getValueOrFallback(parsedJson, "observation")
        severity = cls.getValueOrFallback(parsedJson, "severity")
        prescriptions = cls.getValueFromRegexedKey(parsedJson, "prescription")
        lifestyleChanges = cls.getValueFromRegexedKey(parsedJson, "lifestyleChange")

        # Strip quotation marks
        if observations.startswith('"') and observations.endswith('"'):
            observations = observations[1:-1] # type: ignore
        if severity.startswith('"') and severity.endswith('"'):
            severity = severity[1:-1] # type: ignore
        
        report.severity = severity
        report.observations = observations
        report.prescriptions = json.dumps(prescriptions)
        report.lifestyleChanges = json.dumps(lifestyleChanges)
        db.session.commit()

        return (True, "Additional information retrieved successfully.")

    @classmethod
    def generateReport(cls, reportId: str, xrayImageUrl: str, consultationId: str) -> Tuple[bool, str]:
        """Generate the medical report"""

        # Get the patient, doctor and consultation objects
        consultation = Consultation.queryConsultation(consultationId)
        patient = Patient.queryPatient(consultation.patientId)
        doctor = Doctor.queryDoctor(consultation.doctorId)
        
        # Get the report object
        report = cls.queryReport(reportId)

        # Serialize the patient object
        patientData = patient.serialize()

        # Load the json from strings
        severity = report.severity
        observations = report.observations
        prescriptions = json.loads(report.prescriptions)
        lifestyleChanges = json.loads(report.lifestyleChanges)
        
        # Get the data for the report (according to report template)
        dataForReport = {
            "consultationDate": consultation.consultationDate.strftime("%d/%m/%Y"),
            "reportId": reportId,
            "patientName": patient.name,
            "patientId": patientData["patientId"],
            "gender": patientData["gender"],
            "dob": patientData["dob"],
            "age": patientData["age"],
            "medicalHistory": patientData["medicalHistory"],
            "allergies": patientData["allergies"],
            "xrayUrl": xrayImageUrl,

        # Doctor information dictionary
            "doctorName": doctor.name,
            "doctorId": doctor.id,

        # Consultation details dictionary
            "temperature": consultation.temperature,
            "o2Saturation": consultation.o2Saturation,
            "leukocyteCount": consultation.leukocyteCount,
            "lymphocyteCount": consultation.lymphocyteCount,
            "neutrophilCount": consultation.neutrophilCount,
            "recentlyInIcu": consultation.recentlyInIcu,
            "recentlyNeededSupplementalO2": consultation.recentlyNeededSupplementalO2,
            "intubationPresent": consultation.intubationPresent,
            "consultationNotes": consultation.consultationNotes,

            "classification": report.classification,
            "confidence": report.confidence,
            "severity": severity,
            "observations": observations,
            "prescriptions": prescriptions,
            "lifestyleChanges": lifestyleChanges
        }

        # Determine the base directory
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

        # Load the template
        template_loader = jinja2.FileSystemLoader(os.path.join(base_dir, 'app/miscellaneous'))
        template_env = jinja2.Environment(loader=template_loader)
        template = template_env.get_template("reportTemplate.html")
        output_text = template.render(dataForReport)

        # Generate the PDF
        config = pdfkit.configuration(wkhtmltopdf = current_app.config["WKHTML_PATH"])
        pdfkit.from_string(output_text, 'pdf_generated.pdf', configuration=config)

        # Upload the PDF to Google Cloud
        storageClient = storage.Client()
        reportFilename = f"{reportId}.pdf"
        destinationBlobName = f"pdfReports/{reportFilename}"
        bucket = storageClient.bucket(current_app.config["BUCKET_NAME"])
        blob = bucket.blob(destinationBlobName)

        # Open generated PDF file
        with open("pdf_generated.pdf", "rb") as sourceFile:
            blob.upload_from_file(sourceFile, content_type="application/pdf")
        # Delete the local PDF file
        os.remove("pdf_generated.pdf")

        # Update the report
        report.covidReportUrl = blob.public_url
        db.session.commit()
        return (True, "COVID-19 report generated successfully.")