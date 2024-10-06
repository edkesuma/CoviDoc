from lightning import Trainer
from lightning.pytorch.loggers import WandbLogger
import yaml
import pandas as pd
from lightning.pytorch.callbacks import EarlyStopping, ModelCheckpoint
import torch

# Local dependencies
from .data.CovidCXRDataModule import CovidCXRDataModule
from .model.LitCOVIDNext50 import LitCOVIDNext50


def main(config: dict):
    # Initialize the early stopping callback
    early_stopping = EarlyStopping(
        monitor='val_accuracy',  # Metric to monitor
        patience=config["patience"],          # Number of epochs with no improvement after which training will be stopped
        verbose=True,
        mode='max'           # Mode can be 'min' or 'max' depending on the metric
    )

    # Initialize the model checkpoint callback
    checkpoint_callback = ModelCheckpoint(
        monitor='val_accuracy',  # Metric to monitor
        dirpath='checkpoints/',  # Directory to save the checkpoints
        filename='best-checkpoint',  # Filename for the best checkpoint
        save_top_k=1,         # Save only the best model
        mode='max',            # Mode can be 'min' or 'max' depending on the metric
        save_weights_only=True,  # Save only the model weights
        save_on_train_epoch_end=False  # Save at the end of the validation epoch
    )

    # Setup logger
    wandb_logger = WandbLogger(project=config["project_name"], name=config["run_name"])

    # Read in metadata
    metadata_df = pd.read_csv(config["metadata_path"])

    # Data module
    data_module = CovidCXRDataModule(image_folder=config["image_folder"], metadata_df=metadata_df, image_dimensions=config["image_dimensions"], batch_size=32, severity=config["severity"])
    data_module.setup(stage="fit")

    # Data loaders
    train_dl = data_module.train_dataloader()
    val_dl = data_module.val_dataloader()

    # Model
    n_classes = 2 if config["train_severity"] else 3
    model = LitCOVIDNext50(n_classes=n_classes)

    # Trainer
    device = "gpu" if torch.cuda.is_available() else "cpu"
    trainer = Trainer(logger=wandb_logger, max_epochs=config["max_epochs"], accelerator=device, devices="auto", callbacks=[early_stopping, checkpoint_callback])
    trainer.fit(model, train_dataloaders=train_dl, val_dataloaders=val_dl)

    # Log the best model
    wandb_logger.experiment.log_artifact(checkpoint_callback.best_model_path)

if __name__ == "__main__":
    with open("config_type_clf.yaml") as f:
        config = yaml.load(f, Loader=yaml.FullLoader)

    main(config)