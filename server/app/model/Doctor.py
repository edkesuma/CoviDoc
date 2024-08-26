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

class Doctor(db.Model):
    __tablename__ = "Doctor"
    # Attributes
    id = db.Column(db.String, primary_key=True, default=lambda: f"D{str(uuid.uuid4().hex)}")
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    phone = db.Column(db.String, unique=True, nullable=False)
    dob = db.Column(db.Date, nullable=False)
    gender = db.Column(db.String, nullable=False)
    specialization = db.Column(db.String, nullable=False)
    profilePictureUrl = db.Column(db.String, nullable=True)

    def serialize(self) -> dict:
        """Serialize the doctor object to a dictionary"""
        return {
            "doctorId": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "dob": self.dob.strftime("%Y-%m-%d") if self.dob else None,
            "gender": self.gender,
            "specialization": self.specialization,
            "profilePictureUrl": self.profilePictureUrl
        }

    @classmethod
    def queryDoctor(cls, id: str) -> Self:
        """Query a doctor account by id"""
        return cls.query.filter(cls.id == id).one_or_none()
    
    @classmethod
    def queryAllDoctors(cls) -> Self:
        """Query all doctor accounts"""
        return cls.query.all()
    
    @classmethod
    def createDoctor(cls, details: Dict[str, Union[str, date, None]]) -> Tuple[bool, str]:
        """Create a new doctor account"""
        try:
            phone = cls.query.filter_by(phone=details["phone"]).one_or_none()
            # Phone exist
            if phone:
                return (False, "Phone number already exist")
            # Email already exist
            email = cls.query.filter_by(email=details["email"]).one_or_none()
            if email:
                return (False, "Email already exist")
            
            newDoctor = cls(**details)
            with current_app.app_context():
                db.session.add(newDoctor)
                db.session.commit()
            return (True, "Doctor account created successfully")
        except Exception as e:
            print(e)
            return (False, "Failed to create doctor account")
        
    @classmethod
    def updateDoctor(cls, id: str, newDetails: Dict[str, Union[str, date, None]]) -> Tuple[bool, str]:
        """Update a doctor's profile"""
        try:
            with current_app.app_context():
                # Query doctor account
                doctor = cls.queryDoctor(id)
                if doctor:
                    # Check if phone exists and belongs to another doctor
                    if "phone" in newDetails and newDetails["phone"] != doctor.phone:
                        phone = cls.query.filter_by(phone=newDetails["phone"]).one_or_none()
                        if phone:
                            return (False, "Phone number already exist")
                    # Check if email exists and belongs to another doctor
                    if "email" in newDetails and newDetails["email"] != doctor.email:
                        email = cls.query.filter_by(email=newDetails["email"]).one_or_none()
                        if email:
                            return (False, "Email already exist")
                    
                    # Update doctor account
                    for key, value in newDetails.items():
                        setattr(doctor, key, value)
                    db.session.commit()

                    return (True, "Updated doctor successfully")
                return (False, "Doctor not found")
        except Exception as e:
            print(e)
            return (False, "Failed to update doctor account")
        
    @classmethod
    def deleteDoctor(cls, id: str) -> Tuple[bool, str]:
        """Delete a doctor account"""
        try:
            with current_app.app_context():
                doctor = cls.queryDoctor(id)

                # Delete the profile picture if it exists
                if doctor.profilePictureUrl and os.path.exists(doctor.profilePictureUrl):
                    os.remove(doctor.profilePictureUrl)

                db.session.delete(doctor)
                db.session.commit()
            return (True, "Doctor account deleted successfully")
        except Exception as e:
            print(e)
            return (False, "Failed to delete doctor account")

    @classmethod
    def changePassword(cls, id: str, currPassword: str, newPassword: str) -> Tuple[bool, str]:
        """Change a doctor's password"""
        try:
            with current_app.app_context():
                # Query doctor account
                doctor = cls.queryDoctor(id)
                if doctor and bcrypt.check_password_hash(doctor.password, currPassword):
                    # Update password
                    doctor.password = bcrypt.generate_password_hash(newPassword)
                    db.session.commit()
                    return (True, "Password changed successfully")
                return (False, "Invalid credentials")
        except Exception as e:
            print(e)
            return (False, "Failed to change password")
        
    @classmethod
    def deleteOwnDoctorAccount(cls, id: str, password: str) -> Tuple[bool, str]:
        """Delete a doctor's own account"""
        try:
            with current_app.app_context():
                # Query doctor account
                doctor = cls.queryDoctor(id)
                if doctor and bcrypt.check_password_hash(doctor.password, password):
                    # Delete the profile picture if it exists
                    if doctor.profilePictureUrl and os.path.exists(doctor.profilePictureUrl):
                        os.remove(doctor.profilePictureUrl)
                    # Delete account
                    db.session.delete(doctor)
                    db.session.commit()
                    return (True, "Deleted account successfully")
                return (False, "Invalid credentials")
        except Exception as e:
            print(e)
            return (False, "Failed to delete account")