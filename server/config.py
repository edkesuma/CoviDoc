import os 
from dotenv import load_dotenv

# Load Environment variables
basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))

class Config(object):
    FLASK_APP = os.environ.get('FLASK_APP')