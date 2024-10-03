import os
import lightning as L
from torch.utils.data import DataLoader

# Local dependencies
from .CovidCXRDataset import CovidCXRDataset
from .transform import train_transforms, val_transforms

class CovidCXRDataModule(L.LightningDataModule):
    def __init__(self, image_folder, metadata_df, image_dimensions=(224, 224), batch_size=32):
        self.image_folder = image_folder
        self.metadata_df = metadata_df
        self.batch_size = batch_size
        self.image_dimensions = image_dimensions

    def setup(self, stage: str):
        # Assign train/val datasets for dataloaders
        if stage == "fit":
            self.trainDS = CovidCXRDataset(image_folder=self.image_folder, metadata_df=self.metadata_df, transform=train_transforms(self.image_dimensions[0], self.image_dimensions[1]), set_type="train")
            self.valDS = CovidCXRDataset(image_folder=self.image_folder, metadata_df=self.metadata_df, transform=val_transforms(self.image_dimensions[0], self.image_dimensions[1]), set_type="val")
        
        # Assign test dataset for dataloader
        if stage == "test":
            self.testDS = CovidCXRDataset(image_folder=self.image_folder, metadata_df=self.metadata_df, transform=val_transforms(self.image_dimensions[0], self.image_dimensions[1]), set_type="test")
    
    def train_dataloader(self):
        return DataLoader(self.trainDS, 
                          batch_size=self.batch_size,
                          shuffle=True, 
						  num_workers=os.cpu_count(),  # type: ignore
						  pin_memory=True, 
						  persistent_workers=True)

    def val_dataloader(self):
        return DataLoader(self.valDS, 
                          batch_size=self.batch_size,
                          shuffle=False, 
						  num_workers=os.cpu_count(),  # type: ignore
						  pin_memory=True, 
						  persistent_workers=True)

    def test_dataloader(self):
        return DataLoader(self.testDS, 
                          batch_size=self.batch_size,
                          shuffle=False, 
						  num_workers=os.cpu_count(), # type: ignore
						  pin_memory=True, 
						  persistent_workers=True)