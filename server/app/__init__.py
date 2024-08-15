# Libraries
import os
from flask import Flask
from config import Config

# Local dependencies
from app.routes import router as mainRouter

# Initialize Flask App
flask_app = Flask(__name__)
flask_app.config.from_object(Config)

# Routes
flask_app.register_blueprint(mainRouter, url_prefix="/api")