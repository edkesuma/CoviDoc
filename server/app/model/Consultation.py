# Libraries
from flask import current_app
from typing_extensions import Self # type: ignore
from typing import Dict
from sqlalchemy.sql import func
import uuid

# Local dependencies
from .sqlalchemy import db

class Consultation(db.Model):
    __tablename__ = "Consultation"
    # Attributes
    consultationDate = db.Column(db.Date, primary_key=True, default=func.now())
    doctorId = db.Column(db.String, db.ForeignKey('Doctor.id'), primary_key=True)
    patientId = db.Column(db.String, db.ForeignKey('Patient.id'), primary_key=True)
    temperature = db.Column(db.Float, nullable=False)
    o2Saturation = db.Column(db.Integer, nullable=False)
    leukocyteCount = db.Column(db.Integer, nullable=False)
    neutrophilCount = db.Column(db.Integer, nullable=False)
    lymphocyteCount = db.Column(db.Integer, nullable=False)
    recentlyInIcu = db.Column(db.Boolean, nullable=False)
    recentlyNeededSupplementalO2 = db.Column(db.Boolean, nullable=False)
    intubationPresent = db.Column(db.Boolean, nullable=False)
    consultationNotes = db.Column(db.String, nullable=True)
    xrayImageUrl = db.Column(db.String, nullable=True)
    reportId = db.Column(db.String, db.ForeignKey('Report.id'), nullable=True)