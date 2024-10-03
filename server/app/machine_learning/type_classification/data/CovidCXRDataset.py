import os
from PIL import Image
import torch
from torchvision.transforms import functional as F
from torch.utils.data import Dataset

class CovidCXRDataset(Dataset):
    def __init__(self, image_folder, metadata_df, transform=None, set_type="train"):
        self.image_folder = image_folder
        self.metadata_df = metadata_df[metadata_df["set"] == set_type]
        self.transform = transform

        self.label_mappings = {"healthy": 0, "covid": 1, "other-lung-infection": 2}
    
    def __len__(self):
        return len(self.metadata_df)
    
    def __getitem__(self, idx):
        img_path = os.path.join(self.image_folder, self.metadata_df.iloc[idx]['imagePath'])
        image = Image.open(img_path).convert("RGB")
        
        # Apply the transform if specified
        if self.transform:
            image = self.transform(image)
        
        label_str = self.metadata_df.iloc[idx]['label']
        label = self.label_mappings[label_str]
        label = torch.tensor(label, dtype=torch.long)
        
        return image, label