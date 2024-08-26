# Libraries
from flask import current_app
from typing_extensions import Self # type: ignore
from typing import Dict
from sqlalchemy.sql import func
import uuid

# Local dependencies
from .sqlalchemy import db

class Report(db.Model):
    __tablename__ = "Report"
    # Attributes
    id = db.Column(db.String, primary_key=True, default=lambda: f"R{str(uuid.uuid4().hex)}")
    covidReportUrl = db.Column(db.String, nullable=False)
    classification = db.Column(db.String, nullable=False)
    confidence = db.Column(db.Float, nullable=False)
    severity = db.Column(db.String, nullable=False)
    observations = db.Column(db.String, nullable=False)
    prescriptions = db.Column(db.String, nullable=False)
    lifestyleChanges = db.Column(db.String, nullable=False)
    viewableToPatient = db.Column(db.String, nullable=False)
