from functools import cache
from app.machine_learning.type_classification.model.LitCOVIDNext50 import LitCOVIDNext50

@cache
def load_model(model_path, device):
    model = LitCOVIDNext50.load_from_checkpoint(model_path, n_classes=3)
    model = model.to(device)
    return model

def init_models(app):
    with app.app_context():
        model = load_model(app.config["COVIDNEXT50_MODEL_PATH"], app.config["DEVICE"])
        return model