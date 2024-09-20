# Import Libraries
import os 
from dotenv import load_dotenv
from datetime import timedelta # type: ignore

# Load Environment variables
basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))

class Config(object):
    FLASK_APP = os.environ.get('FLASK_APP')
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    BUCKET_NAME = os.environ.get('BUCKET_NAME')
    GOOGLE_APPLICATION_CREDENTIALS = os.environ.get('GOOGLE_APPLICATION_CREDENTIALS')
    GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')
    WKHTML_PATH = os.environ.get('WKHTML_PATH')
    CLASSIFICATION_MODEL_PATH = os.environ.get('CLASSIFICATION_MODEL_PATH')