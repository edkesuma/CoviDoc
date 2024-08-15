# Libraries
from flask import Blueprint
from datetime import datetime

# Initialize
router = Blueprint("main", __name__)

@router.route("/test")
def test():
    return {'data': 'test success', "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S")}