# Libraries
import datetime
import os
import uuid
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config
from flask_jwt_extended import verify_jwt_in_request, get_jwt, JWTManager


# Local dependencies
from app.model import db, SystemAdmin, Doctor, Patient, Consultation, Report
from app.routes import router as mainRouter
from app.controller.systemAdmin import router as systemAdminRouter
from app.controller.authentication import router as authenticationRouter
from app.controller.patient import router as patientRouter
from app.controller.doctor import router as doctorRouter
from .extensions import bcrypt, jwt, mail
# from app.controller.authentication.utils import mail
from app.model_loader import init_models

# Initialize Flask App
flask_app = Flask(__name__)
flask_app.config.from_object(Config)

# Initialize others
bcrypt.init_app(flask_app)
jwt.init_app(flask_app)
mail.init_app(flask_app)

# Initialize ml models
init_models(flask_app)

# SQLAlchemy
db.init_app(flask_app)
with flask_app.app_context():
    db.create_all()
    # Create System Admin account
    if SystemAdmin.queryAllAdminAccounts() == []:
        systemAdmin = SystemAdmin(
            name = "Admin",
            email = "admin@admin.com",
            password = bcrypt.generate_password_hash("admin"),
            phone = "1234567890"
        )
        db.session.add(systemAdmin)
        db.session.commit()

# Routes
flask_app.register_blueprint(mainRouter, url_prefix="/api")
flask_app.register_blueprint(authenticationRouter, url_prefix="/api/authentication")
flask_app.register_blueprint(systemAdminRouter, url_prefix="/api/systemAdmin")
flask_app.register_blueprint(patientRouter, url_prefix="/api/patient")
flask_app.register_blueprint(doctorRouter, url_prefix="/api/doctor")