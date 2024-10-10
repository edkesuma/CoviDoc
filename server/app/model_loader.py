from functools import cache
from app.machine_learning import LitCOVIDNext50
import torch

@cache
def load_model(model_path, device, n_classes):
    # Load the model from the checkpoint
    model = LitCOVIDNext50(n_classes=n_classes)
    model.load_state_dict(torch.load(model_path, map_location=device, weights_only=True))
    return model

def init_models(app):
    with app.app_context():
        type_clf_model = load_model(app.config["COVIDNEXT50_MODEL_PATH"], app.config["DEVICE"], n_classes=3)
        severity_clf_model = load_model(app.config["COVIDNEXT50SEV_MODEL_PATH"], app.config["DEVICE"], n_classes=2)
        return type_clf_model, severity_clf_model