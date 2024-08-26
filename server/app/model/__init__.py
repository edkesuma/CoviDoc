# Local dependencies
from .sqlalchemy import db
from .SystemAdmin import SystemAdmin
from .Doctor import Doctor
from .Patient import Patient
from .Consultation import Consultation
from .Report import Report

__all__ = [
    "db", "SystemAdmin", "Doctor", "Patient", "Consultation", "Report"
]