# Libraries
from flask import current_app
from typing_extensions import Self # type: ignore
from typing import Dict, Tuple
from sqlalchemy.sql import func
import uuid
from datetime import datetime, timezone, timedelta

# Local dependencies
from .sqlalchemy import db

class Consultation(db.Model):
    __tablename__ = "Consultation"
    # Attributes
    id = db.Column(db.String, primary_key=True, default=lambda: f"C{str(uuid.uuid4().hex)}")
    consultationDate = db.Column(db.Date, nullable=False, default=lambda: func.now())
    doctorId = db.Column(db.String, db.ForeignKey('Doctor.id'))
    patientId = db.Column(db.String, db.ForeignKey('Patient.id'))
    temperature = db.Column(db.Float, nullable=False)
    o2Saturation = db.Column(db.Integer, nullable=False)
    leukocyteCount = db.Column(db.Integer, nullable=False)
    neutrophilCount = db.Column(db.Integer, nullable=False)
    lymphocyteCount = db.Column(db.Integer, nullable=False)
    recentlyInIcu = db.Column(db.Boolean, nullable=False)
    recentlyNeededSupplementalO2 = db.Column(db.Boolean, nullable=False)
    intubationPresent = db.Column(db.Boolean, nullable=False)
    consultationNotes = db.Column(db.String, nullable=False)
    xrayImageUrl = db.Column(db.String, nullable=False)
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
            "leukocyteCount": self.leukocyteCount,
            "neutrophilCount": self.neutrophilCount,
            "lymphocyteCount": self.lymphocyteCount,
            "recentlyInIcu": self.recentlyInIcu,
            "recentlyNeededSupplementalO2": self.recentlyNeededSupplementalO2,
            "intubationPresent": self.intubationPresent,
            "consultationNotes": self.consultationNotes,
            "xrayImageUrl": self.xrayImageUrl,
            "reportId": self.reportId
        }
    
    def getMedicalData(self) -> dict:
        """Get specific consultation data"""
        return {
            "temperature": self.temperature,
            "o2Saturation": self.o2Saturation,
            "leukocyteCount": self.leukocyteCount,
            "neutrophilCount": self.neutrophilCount,
            "lymphocyteCount": self.lymphocyteCount,
            "recentlyInIcu": self.recentlyInIcu,
            "recentlyNeededSupplementalO2": self.recentlyNeededSupplementalO2,
            "intubationPresent": self.intubationPresent,
            "consultationNotes": self.consultationNotes
        }
    
    @classmethod
    def queryConsultation(cls, id: str) -> Self:
        """Query a consultation by id"""
        return cls.query.filter(cls.id == id).one_or_none()
    
    @classmethod
    def queryAllPatientConsultations(cls, patientId: str) -> Self:
        """Query all consultations for a patient"""
        return cls.query.filter(cls.patientId == patientId).all()
    
    @classmethod
    def createConsultation(cls, details: Dict[str, str]) -> Tuple[bool, str]:
        """Create a new consultation"""
        consultation = cls(
            consultationDate=datetime.strptime(details["consultationDate"], "%d/%m/%Y"),
            doctorId=details["doctorId"],
            patientId=details["patientId"],
            temperature=details["temperature"],
            o2Saturation=details["o2Saturation"],
            leukocyteCount=details["leukocyteCount"],
            neutrophilCount=details["neutrophilCount"],
            lymphocyteCount=details["lymphocyteCount"],
            recentlyInIcu=details["recentlyInIcu"],
            recentlyNeededSupplementalO2=details["recentlyNeededSupplementalO2"],
            intubationPresent=details["intubationPresent"],
            consultationNotes=details["consultationNotes"],
            xrayImageUrl=details["xrayImageUrl"]
        )
        db.session.add(consultation)
        db.session.commit()
        return (True, "Consultation created successfully")