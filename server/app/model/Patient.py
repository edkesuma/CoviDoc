# Libraries
from flask import current_app
from typing_extensions import Self # type: ignore
from typing import Dict, Union, Tuple
from sqlalchemy.sql import func
import uuid
from datetime import date
import os

# Local dependencies
from .sqlalchemy import db
from app.extensions import bcrypt

class Patient(db.Model):
    __tablename__ = "Patient"
    # Attributes
    id = db.Column(db.String, primary_key=True, default=lambda: f"P{str(uuid.uuid4().hex)}")
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    phone = db.Column(db.String, unique=True, nullable=False)
    dob = db.Column(db.Date, nullable=False)
    gender = db.Column(db.String, nullable=False)
    medicalHistory = db.Column(db.String, nullable=True)
    allergies = db.Column(db.String, nullable=True)
    currentState = db.Column(db.String, nullable=False, default="Closed")
    profilePictureUrl = db.Column(db.String, nullable=True)

    def serialize(self) -> dict:
        """Serialize the patient object to a dictionary"""
        return {
            "patientId": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "dob": self.dob.strftime("%Y-%m-%d") if self.dob else None,
            "gender": self.gender,
            "medicalHistory": self.medicalHistory,
            "allergies": self.allergies,
            "currentState": self.currentState,
            "profilePictureUrl": self.profilePictureUrl
        }
    
    @classmethod
    def queryPatient(cls, id: str) -> Self:
        """Query a patient account by id"""
        return cls.query.filter(cls.id == id).one_or_none()
    
    @classmethod
    def queryAllPatients(cls) -> Self:
        """Query all patient accounts"""
        return cls.query.all()
    
    @classmethod
    def createPatient(cls, details: Dict[str, str]) -> Tuple[bool, str]:
        """Create a new patient account"""
        try:
            phone = cls.query.filter_by(phone=details["phone"]).one_or_none()
            # Phone exist
            if phone:
                return (False, "Phone number already exist")
            # Email already exist
            email = cls.query.filter_by(email=details["email"]).one_or_none()
            if email:
                return (False, "Email already exist")
            newPatient = cls(**details)
            with current_app.app_context():
                db.session.add(newPatient)
                db.session.commit()
            return (True, "Created patient successfully")
        except Exception as e:
            print(e)
            return (False, "Failed to create patient")
    
    @classmethod
    def updatePatient(cls, id: str, newDetails: Dict[str, Union[str, date, None]]) -> Tuple[bool, str]:
        """Update a patient's profile"""
        try:
            with current_app.app_context():
                # Query patient account
                patient = cls.queryPatient(id)
                if patient:
                    # Check if phone exists and belongs to another patient
                    if "phone" in newDetails and newDetails["phone"] != patient.phone:
                        phone = cls.query.filter_by(phone=newDetails["phone"]).one_or_none()
                        if phone:
                            return (False, "Phone number already exist")
                    # Check if email exists and belongs to another patient
                    if "email" in newDetails and newDetails["email"] != patient.email:
                        email = cls.query.filter_by(email=newDetails["email"]).one_or_none()
                        if email:
                            return (False, "Email already exist")
                    
                    # Update patient account
                    for key, value in newDetails.items():
                        if getattr(patient, key) != value:
                            setattr(patient, key, value)
                    db.session.commit()

                    return (True, "Updated patient successfully")
                return (False, "Patient not found")
        except Exception as e:
            print(e)
            return (False, "Failed to update patient")
        
    @classmethod
    def deletePatient(cls, id: str) -> Tuple[bool, str]:
        """Delete a patient account"""
        try:
            with current_app.app_context():
                patient = cls.queryPatient(id)

                # Delete the profile picture if it exists
                if patient.profilePictureUrl and os.path.exists(patient.profilePictureUrl):
                    os.remove(patient.profilePictureUrl)

                db.session.delete(patient)
                db.session.commit()
                return (True, "Deleted patient successfully")
        except Exception as e:
            print(e)
            return (False, "Failed to delete patient")
        
    @classmethod
    def changePassword(cls, id: str, currPassword: str, newPassword: str) -> Tuple[bool, str]:
        """Change a patient's password"""
        try:
            with current_app.app_context():
                # Query patient account
                patient = cls.queryPatient(id)
                if patient and bcrypt.check_password_hash(patient.password, currPassword):
                    # Update password
                    patient.password = bcrypt.generate_password_hash(newPassword)
                    db.session.commit()
                    return (True, "Changed password successfully")
                return (False, "Invalid credentials")
        except Exception as e:
            print(e)
            return (False, "Failed to change password")
        
    @classmethod
    def deleteOwnPatientAccount(cls, id: str, password: str) -> Tuple[bool, str]:
        """Delete a patient's own account"""
        try:
            with current_app.app_context():
                # Query patient account
                patient = cls.queryPatient(id)
                if patient and bcrypt.check_password_hash(patient.password, password):
                    # Delete the profile picture if it exists
                    if patient.profilePictureUrl and os.path.exists(patient.profilePictureUrl):
                        os.remove(patient.profilePictureUrl)
                    # Delete account
                    db.session.delete(patient)
                    db.session.commit()
                    return (True, "Deleted account successfully")
                return (False, "Invalid credentials")
        except Exception as e:
            print(e)
            return (False, "Failed to delete account")