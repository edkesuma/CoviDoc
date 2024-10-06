# Libraries
from flask import current_app
from typing_extensions import Self # type: ignore
from typing import Dict, Tuple
from sqlalchemy.sql import func
import uuid
from datetime import date, datetime, timezone, timedelta

# Local dependencies
from .sqlalchemy import db

class Consultation(db.Model):
    __tablename__ = "Consultation"
    # Attributes
    id = db.Column(db.String, primary_key=True, default=lambda: f"C{str(uuid.uuid4().hex)}")
    consultationDate = db.Column(db.Date, nullable=True, default=lambda: func.now())
    doctorId = db.Column(db.String, db.ForeignKey('Doctor.id'))
    patientId = db.Column(db.String, db.ForeignKey('Patient.id'))
    temperature = db.Column(db.Float, nullable=True)
    o2Saturation = db.Column(db.Integer, nullable=True)
    recentlyInIcu = db.Column(db.Boolean, nullable=True)
    recentlyNeededSupplementalO2 = db.Column(db.Boolean, nullable=True)
    intubationPresent = db.Column(db.Boolean, nullable=True)
    consultationNotes = db.Column(db.String, nullable=True)
    xrayImageUrl = db.Column(db.String, nullable=True)
    highlightedXrayImageUrl = db.Column(db.String, nullable=True)
    reportId = db.Column(db.String, db.ForeignKey('Report.id'), nullable=True)

    # @classmethod
    # def sgTime(cls) -> datetime:
    #     timezone_offset = 8.0  # SGT (UTC+08:00)
    #     tzinfo = timezone(timedelta(hours=timezone_offset))
    #     return datetime.now(tzinfo)
        

    def serialize(self) -> dict:
        """Serialize the consultation object to a dictionary"""
        return {
            "consultationId": self.id,
            "consultationDate": self.consultationDate.strftime("%d/%m/%Y"),
            "doctorId": self.doctorId,
            "patientId": self.patientId,
            "temperature": self.temperature,
            "o2Saturation": self.o2Saturation,
            "recentlyInIcu": self.recentlyInIcu,
            "recentlyNeededSupplementalO2": self.recentlyNeededSupplementalO2,
            "intubationPresent": self.intubationPresent,
            "consultationNotes": self.consultationNotes,
            "xrayImageUrl": self.xrayImageUrl,
            "highlightedXrayImageUrl": self.highlightedXrayImageUrl,
            "reportId": self.reportId
        }
    
    def getMedicalData(self) -> dict:
        """Get specific consultation data"""
        return {
            "temperature": self.temperature,
            "o2Saturation": self.o2Saturation,
            "recentlyInIcu": self.recentlyInIcu,
            "recentlyNeededSupplementalO2": self.recentlyNeededSupplementalO2,
            "intubationPresent": self.intubationPresent,
            "consultationNotes": self.consultationNotes
        }
    
    @classmethod
    def queryConsultation(cls, id: str) -> Self:
        """Query a consultation by id"""
        return cls.query.filter(cls.id == id).one_or_none() # type: ignore
    
    @classmethod
    def queryAllPatientConsultations(cls, patientId: str) -> Self:
        """Query all consultations for a patient"""
        return cls.query.filter(cls.patientId == patientId).all() # type: ignore
    
    @classmethod
    def queryAllConsultations(cls) -> Self:
        """Query all consultations"""
        return cls.query.all() # type: ignore
    
    @classmethod
    def createConsultation(cls, details: Dict[str, str]) -> Tuple[bool, str, str]:
        """Create a new consultation"""
        consultation = cls()
        # Update consultation class details
        consultation.id = details["consultationId"]
        consultation.doctorId=details["doctorId"]
        consultation.patientId=details["patientId"]
        consultation.xrayImageUrl=details["xrayImageUrl"] 

        # Set default date to today
        consultation.consultationDate = date.today()

        db.session.add(consultation)
        db.session.commit()
        return (True, "Consultation created successfully", consultation.id)
    
    @classmethod
    def updateConsultation(cls, consultationId: str, details: Dict[str, str]) -> Tuple[bool, str]:
        """Update a consultation"""
        consultation = cls.queryConsultation(consultationId)
        if consultation:
            consultation.consultationDate = details["consultationDate"]
            consultation.temperature = details["temperature"]
            consultation.o2Saturation = details["o2Saturation"]
            consultation.recentlyInIcu = details["recentlyInIcu"]
            consultation.recentlyNeededSupplementalO2 = details["recentlyNeededSupplementalO2"]
            consultation.intubationPresent = details["intubationPresent"]
            consultation.consultationNotes = details["consultationNotes"]
            db.session.commit()
            return (True, "Consultation updated successfully")
        return (False, "Consultation not found")