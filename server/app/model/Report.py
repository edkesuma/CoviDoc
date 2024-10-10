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
from google.cloud import storage

# ML Libraries
import torch.nn.functional as F
from PIL import Image
import requests
from io import BytesIO

# RAG LLM Libraries
import google.generativeai as genai # type: ignore
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_core.prompts import PromptTemplate
from langchain_community.vectorstores import Chroma
from langchain.chains import RetrievalQA

# Local dependencies
from .sqlalchemy import db
from . import Patient, Doctor, Consultation
from app.model_loader import load_model
from app.machine_learning.classification_models.data import val_transforms

# Turn off warnings
import warnings
warnings.filterwarnings("ignore")

class Report(db.Model):
    __tablename__ = "Report"
    # Attributes
    id = db.Column(db.String, primary_key=True, default=lambda: f"R{str(uuid.uuid4().hex)}")
    reportUrl = db.Column(db.String, nullable=True)
    classification = db.Column(db.String, nullable=True)
    classificationConfidence = db.Column(db.Float, nullable=True)
    severity = db.Column(db.String, nullable=True)
    severityConfidence = db.Column(db.Float, nullable=True)
    prescriptions = db.Column(db.String, nullable=True)
    prescriptionsLink = db.Column(db.String, nullable=True)
    lifestyleChanges = db.Column(db.String, nullable=True)
    lifestyleLink = db.Column(db.String, nullable=True)
    viewableToPatient = db.Column(db.Boolean, nullable=False, default=False)

    def serialize(self) -> dict:
        """Serialize the report object to a dictionary"""
        return {
            "reportId": self.id,
            "reportUrl": self.reportUrl,
            "classification": self.classification,
            "classificationConfidence": self.classificationConfidence,
            "severity": self.severity,
            "severityConfidence": self.severityConfidence,
            "prescriptions": self.prescriptions,
            "lifestyleChanges": self.lifestyleChanges,
            "viewableToPatient": self.viewableToPatient
        }
    
    def getFindings(self) -> dict:
        """Get the findings of the report"""
        return {
            "classification": self.classification,
            "classificationConfidence": self.classificationConfidence,
            "severity": self.severity,
            "severityConfidence": self.severityConfidence
        }
    
    @classmethod
    def queryReport(cls, id: str) -> Self | None:
        """Query a report by id"""
        return cls.query.filter(cls.id == id).one_or_none()
    
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
    def classifyXray(cls, consultationId: str) -> Tuple[bool, str, dict]:
        """Classify an x-ray image"""
        # Create a blank report
        report = cls()
        db.session.add(report)

        # Get the consultation object
        consultation = Consultation.queryConsultation(consultationId)
        # Update consultation with new report id
        consultation.reportId = report.id
        
        # Get the xray image URL
        xrayImageUrl = consultation.xrayImageUrl

        # Load the type classification model
        type_clf_model = load_model(current_app.config["COVIDNEXT50_MODEL_PATH"], current_app.config["DEVICE"], n_classes=3)

        # Get image from URL
        response = requests.get(xrayImageUrl)
        image = Image.open(BytesIO(response.content)).convert("RGB")
        
        # Preprocess the image
        transform = val_transforms(224, 224)
        image = transform(image)
        
        # Move the image to the same device as the model
        image = image.to(current_app.config["DEVICE"]) # type: ignore
        
        # Classify the image
        predicted_class_idx, classificationConfidence = type_clf_model.classify_image(image)
        predicted_class_idx = int(predicted_class_idx)

        # Generate gradcam image
        gradcam_image = type_clf_model.generate_gradcam(image, target_class=predicted_class_idx)

        # Convert the PIL.Image to a BytesIO object
        gradcam_image_io = BytesIO()
        gradcam_image.save(gradcam_image_io, format='JPEG')
        gradcam_image_io.seek(0)  # Reset the stream position to the beginning

        # Upload gradcam image to gcloud
        gradcam_image_filename = f"{consultation.id}_highlighted.png"
        storageClient = storage.Client()
        bucket = storageClient.bucket(current_app.config["BUCKET_NAME"])
        blob = bucket.blob(f"xrayImages/{gradcam_image_filename}")
        blob.upload_from_file(gradcam_image_io, content_type="image/jpeg")
        blob.cache_control = "private, no-cache, max-age=0"
        blob.patch()
        gradcam_image_url = blob.public_url

        # Map the class index to the classification
        idx_to_classification_mapping = {0: "Healthy", 1: "Covid-19", 2: "Other Lung Infection"}
        predicted_type = idx_to_classification_mapping[predicted_class_idx]

        # Update the report
        report.classification = predicted_type
        report.classificationConfidence = classificationConfidence
        # Update the consultation with gradcam image
        consultation.highlightedXrayImageUrl = gradcam_image_url

        if predicted_type == "Healthy":
            report.severity = "NA"
            report.severityConfidence = 100
        else:
            severity_clf_model = load_model(current_app.config["COVIDNEXT50SEV_MODEL_PATH"], current_app.config["DEVICE"], n_classes=2)
            predicted_severity_idx, severityConfidence = severity_clf_model.classify_image(image)
            predicted_severity_idx = int(predicted_severity_idx)
            idx_to_severity_mapping = {0: "Mild", 1: "Moderate to Severe"}
            predicted_severity = idx_to_severity_mapping[predicted_severity_idx]
            # Update with predicted severity
            report.severity = predicted_severity
            report.severityConfidence = severityConfidence

        db.session.commit()

        data = {
            "type_classification": predicted_type,
            "severity_classification": predicted_severity,
            "type_confidence": classificationConfidence,
            "severity_confidence": severityConfidence,
            "xray_image_url": xrayImageUrl,
            "gradcam_image_url": gradcam_image_url
        }

        return (True, "X-ray classified successfully.", data)
    
    @classmethod
    def updateFindings(cls, reportId: str, updatedFindings: dict) -> Tuple[bool, str]:
        """Update the findings of a report"""
        report = cls.queryReport(reportId)
        report.classification = updatedFindings["classification"]
        report.classificationConfidence = updatedFindings["classificationConfidence"]
        report.severity = updatedFindings["severity"]
        report.severityConfidence = updatedFindings["severityConfidence"]
        db.session.commit()
        return (True, "Findings updated successfully.")
    
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
    def cleanJsonString(cls, jsonString: str):
        jsonString = jsonString.strip('```json\n')
        jsonString = jsonString.replace('\n', '')
        jsonString = jsonString.replace('  ', '')
        jsonString = jsonString.replace('    ', '')
        if jsonString[-2] == ',':
            jsonString = jsonString[:-2] + ']'
        return jsonString

    @classmethod
    def generatePrescriptions(cls, chain: RetrievalQA, patientString: str, consultationString: str, classificationData: dict):
        prompt = f"""You are an assistant to a doctor, analyzing patient data to provide recommendations for both the patient and the treating doctor.
            The patient has been classified as having {classificationData['classification']} with a confidence level of {classificationData['classificationConfidence']}.
            Note that the severity of the condition is {classificationData['severity']} with a confidence level of {classificationData['severityConfidence']}.

            Here is patient's metadata:
            {patientString}

            Here is the consultation details:
            {consultationString}
            Put emphasis on whether the patient was recently in the ICU, needed supplemental O2 and O2 saturation.

            Instructions:
            Based on the patient metadata and consultation details, generate the prescriptions.
            Offer prescriptions tailored to the patient's situation, specifically to address the {classificationData['severity']} {classificationData['classification']}.
            Here are the guidelines:
            - Suggest prescription medications that could be beneficial based on the patient's medical history.
            - Use clear and concise medical language.
            - Provide 5 prescription recommendations.
            - For each prescription, recommend the name, dosage and reason.
            - Wrap every recommendation in a {{}}
            
            ONLY INCLUDE THE JSON

            Return a list of JSON in this format:
            Return a `List[{{"prescriptionName": List[name (dosage), reason]]}}]` with your responses."""
        
        response = chain({"query": prompt})
        print(f"Response from prescription chain: {response}")
        while response.get("finish_reason") == "RECITATION":
            response = chain({"query": prompt})
            print(f"Repeated response from prescription chain: {response}")
        
        documentLink = response['source_documents'][0].metadata['link']
        responseStr = response['result']
        cleanedStr = cls.cleanJsonString(responseStr)
        print(f"Cleaned string: {cleanedStr}")

        return cleanedStr, documentLink
    
    @classmethod
    def generateLifestyle(cls, chain: RetrievalQA, patientString: str, consultationString: str, classificationData: dict):
        prompt = f"""You are an assistant to a doctor, analyzing patient data to provide recommendations for both the patient and the treating doctor.
            The patient has been classified as having {classificationData['classification']} with a confidence level of {classificationData['classificationConfidence']}.
            Note that the severity of the condition is {classificationData['severity']} with a confidence level of {classificationData['severityConfidence']}.

            Here is patient's metadata:
            {patientString}

            Here is the consultation details:
            {consultationString}
            Put emphasis on whether the patient was recently in the ICU, needed supplemental O2 and O2 saturation.

            Instructions:
            Based on the patient metadata and consultation details, generate the rehabilitation practices.
            Offer rehabilitation practices tailored to the patient's situation, specifically to address the {classificationData['severity']} {classificationData['classification']}.
            Here are the guidelines:
            - Suggest rehabilitation practices or breathing exercises that could be beneficial based on the patient's medical history.
            - If a breathing exercise is suggested, include concise steps to perform the exercise.
            - Use clear and concise medical language.
            - Provide 5 rehabilitation practice recommendations.
            - Wrap every recommendation in a {{}}   

            ONLY INCLUDE THE JSON

            Return a list of JSON in this format:
            Return a `List[{{"lifestyleChange": List[lifestyleChange, reason]]}}]` with your responses."""
        
        response = chain({"query": prompt})
        print(f"Response from lifestyle chain: {response}")
        while response.get("finish_reason") == "RECITATION":
            response = chain({"query": prompt})
            print(f"Repeated response from lifestyle chain: {response}")
        
        documentLink = response['source_documents'][0].metadata['link']
        responseStr = response['result']
        cleanedStr = cls.cleanJsonString(responseStr)

        return cleanedStr, documentLink

    @classmethod
    def generateLLMAdditionalInfo(cls, reportId: str, patient: Patient, consultation: Consultation) -> Tuple[bool, str, dict]:
        """Get additional information from LLM"""

        # Get current report object
        report = cls.queryReport(reportId)
        
        # # Initialize gemini model
        genai.configure(api_key=current_app.config["GEMINI_API_KEY"])
        model = ChatGoogleGenerativeAI(model="gemini-1.5-flash", google_api_key=current_app.config["GEMINI_API_KEY"], temperature=0.2) # type: ignore
        embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=current_app.config["GEMINI_API_KEY"])

        # Load from db
        persistentDirectory = "app/machine_learning/chromaDB"
        vector_store = Chroma(persist_directory=persistentDirectory, embedding_function=embeddings)

        # # Get medical data from patient and consultation
        patientData = patient.getMedicalData()
        consultationData = consultation.getMedicalData()
        classificationData = report.getFindings()

        # Stringify medical data
        patientString = cls.stringifyJson(patientData)
        consultationString = cls.stringifyJson(consultationData)

        # Set filter
        if classificationData["classification"] == "Covid-19":
            filterType = "covid"
        elif classificationData["classification"] == "Other Lung Infection":
            filterType = "other-lung-infection"

        # Set up retriever
        retriever = vector_store.as_retriever(
            search_type="mmr", 
            search_kwargs={
                "k": 1, 
                "filter": dict(type=filterType)
            })
        
        # Setup chain
        template = """Use the following pieces of context to answer the question.
        {context}
        Question: {question}
        Helpful Answer:"""
        QA_CHAIN_PROMPT = PromptTemplate(template=template, input_variables=['context', 'question'])# Run chain
        qa_chain = RetrievalQA.from_chain_type(
            model,
            retriever=retriever,
            return_source_documents=True,
            chain_type_kwargs={"prompt": QA_CHAIN_PROMPT}
        )

        # Generate prescriptions, lifestyle suggestions
        prescriptions, prescriptionsLink = cls.generatePrescriptions(qa_chain, patientString, consultationString, classificationData)
        lifestyleChanges, lifestyleLink = cls.generateLifestyle(qa_chain, patientString, consultationString, classificationData)
        
        # Store prescriptions and lifestyle changes
        report.prescriptions = prescriptions
        report.lifestyleChanges = lifestyleChanges
        report.prescriptionsLink = prescriptionsLink
        report.lifestyleLink = lifestyleLink
        db.session.commit()

        data = {
            "prescriptions": prescriptions,
            "lifestyleChanges": lifestyleChanges,
            "prescriptionsLink": prescriptionsLink,
            "lifestyleLink": lifestyleLink
        }

        return (True, "Additional information retrieved successfully.", data)

    @classmethod
    def generateReport(cls, consultation: Consultation) -> Tuple[bool, str]:
        """Generate the medical report"""

        # Get the patient, doctor objects
        patient = Patient.queryPatient(consultation.patientId)
        doctor = Doctor.queryDoctor(consultation.doctorId)
        
        # Get the report object
        report = cls.queryReport(consultation.reportId)

        # Serialize the patient object
        patientData = patient.serialize()

        # Load the json from strings
        prescriptions = json.loads(report.prescriptions)
        lifestyleChanges = json.loads(report.lifestyleChanges)
        
        # Get the data for the report (according to report template)
        dataForReport = {
            "consultationDate": consultation.consultationDate.strftime("%d/%m/%Y"),
            "reportId": report.id,
            "patientName": patient.name,
            "patientId": patientData["patientId"],
            "gender": patientData["gender"],
            "dob": patientData["dob"],
            "age": patientData["age"],
            "medicalHistory": patientData["medicalHistory"],
            "allergies": patientData["allergies"],
            "xrayUrl": consultation.xrayImageUrl,
            "xrayUrl2": consultation.highlightedXrayImageUrl,
            "highlightedXrayUrl": consultation.highlightedXrayImageUrl,

        # Doctor information dictionary
            "doctorName": doctor.name,
            "doctorId": doctor.id,

        # Consultation details dictionary
            "temperature": consultation.temperature,
            "o2Saturation": consultation.o2Saturation,
            "recentlyInIcu": consultation.recentlyInIcu,
            "recentlyNeededSupplementalO2": consultation.recentlyNeededSupplementalO2,
            "intubationPresent": consultation.intubationPresent,
            "consultationNotes": consultation.consultationNotes,

            "classification": report.classification,
            "classificationConfidence": report.classificationConfidence,
            "severity": report.severity,
            "severityConfidence": report.severityConfidence,
            "prescriptions": prescriptions,
            "lifestyleChanges": lifestyleChanges,
            "prescriptionsLink": report.prescriptionsLink,
            "lifestyleLink": report.lifestyleLink
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
        reportFilename = f"{report.id}.pdf"
        destinationBlobName = f"pdfReports/{reportFilename}"
        bucket = storageClient.bucket(current_app.config["BUCKET_NAME"])
        blob = bucket.blob(destinationBlobName)

        # Open generated PDF file
        with open("pdf_generated.pdf", "rb") as sourceFile:
            blob.upload_from_file(sourceFile, content_type="application/pdf")
        # Delete the local PDF file
        os.remove("pdf_generated.pdf")

        # Remove cache control
        blob.cache_control = "private, no-cache, max-age=0"
        blob.patch()

        # Update the report
        report.reportUrl = blob.public_url
        db.session.commit()
        return (True, "COVID-19 report generated successfully.")
    
    # TODO: FOR KARTHI VIZ
    @classmethod
    def getClassificationsOverTimeData(cls) -> dict:
        """Get the classifications of a patient over time"""
        # Get all consultations 
        consultations = Consultation.queryAllConsultations()
        # Get the classifications of each consultation
        classifications = []
        for consultation in consultations:
            report = cls.queryReport(consultation.reportId)
            clf = report.classification
            classifications.append(clf)
        # parse month from date (set this as the key)
        # value is found out from number of classifications on that month
        
        return {"January": 5, "February": 4}