import torch
from torch import nn
import lightning as L
import numpy as np
from torchmetrics import Accuracy
from torchvision import transforms
import cv2
from PIL import Image


# Local dependencies
from .COVIDNext50 import COVIDNext50
from .GradCam import GradCAM


class LitCOVIDNext50(L.LightningModule):
    def __init__(self, n_classes):
        super().__init__()
        self.model = COVIDNext50(n_classes)
        self.train_accuracy = Accuracy(task="multiclass", num_classes=n_classes)
        self.val_accuracy = Accuracy(task="multiclass", num_classes=n_classes)
        self.test_accuracy = Accuracy(task="multiclass", num_classes=n_classes)

    def forward(self, input):
        return self.model(input)

    def probability(self, logits):
        return self.model.probability(logits)
    
    def training_step(self, batch, batch_idx):
        inputs, labels = batch
        logits = self(inputs)
        loss = nn.functional.cross_entropy(logits, labels)
        self.log("train_loss", loss)

        # Log the training accuracy
        preds = torch.argmax(logits, dim=1)
        acc = self.train_accuracy(preds, labels)
        self.log("train_accuracy", acc, prog_bar=True)

        return loss
    
    def validation_step(self, batch, batch_idx):
        inputs, labels = batch
        logits = self(inputs)
        loss = nn.functional.cross_entropy(logits, labels)
        self.log("val_loss", loss)

        # Log the validation accuracy
        preds = torch.argmax(logits, dim=1)
        acc = self.val_accuracy(preds, labels)
        self.log("val_accuracy", acc, prog_bar=True)

        return loss
    
    def test_step(self, batch, batch_idx):
        inputs, labels = batch
        logits = self(inputs)
        loss = nn.functional.cross_entropy(logits, labels)
        self.log("test_loss", loss)

        # Log the test accuracy
        preds = torch.argmax(logits, dim=1)
        acc = self.test_accuracy(preds, labels)
        self.log("test_accuracy", acc, prog_bar=True)

        return loss
    
    def configure_optimizers(self):
        optimizer = torch.optim.Adam(self.parameters(), lr=1e-3) # type: ignore
        scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(
            optimizer, mode='max', factor=0.1, patience=3, verbose=True, threshold=0.0001 # type: ignore
        )
        return {
            'optimizer': optimizer,
            'lr_scheduler': {
                'scheduler': scheduler,
                'monitor': 'val_acc',
                'interval': 'epoch',
                'frequency': 1
            }
        }
    
    def generate_gradcam(self, img, target_class: int):
        # Function to overlay CAM on the image
        def show_cam_on_image(img, mask, use_rgb=False):
            heatmap = cv2.applyColorMap(np.uint8(255 * mask), cv2.COLORMAP_JET) # type: ignore
            if use_rgb:
                heatmap = cv2.cvtColor(heatmap, cv2.COLOR_BGR2RGB)
            heatmap = np.float32(heatmap) / 255
            cam = heatmap + np.float32(img)
            cam = cam / np.max(cam)
            return np.uint8(255 * cam)

        target_layer = self.model.backbone_end.module[-1]
        grad_cam = GradCAM(self.model, target_layer)

        cam = grad_cam.generate_cam(img.unsqueeze(0), target_class)

        # Convert to numpy array
        img_np = img.permute(1,2,0).numpy()

        # Visualize CAM
        cam_image = show_cam_on_image(img_np, cam, use_rgb=True)

        # Return the image
        return Image.fromarray(cam_image)

    def classify_image(self, model, img):
        # Preprocess the image
        img = img.unsqueeze(0)

        # Set the model to evaluation mode
        model.eval()
        
        # Disable gradient calculation
        with torch.no_grad():
            # Get the model output
            output = model(img)
            # Apply softmax to get probabilities
            probabilities = torch.nn.functional.softmax(output, dim=-1)
            
            # Get the classification and confidence
            confidence, class_idx = torch.max(probabilities, dim=-1)
            
            # Convert to numpy for easier handling
            confidence = round(confidence.item() * 100, 2)
            class_idx = class_idx.item()
            
        return class_idx, confidence