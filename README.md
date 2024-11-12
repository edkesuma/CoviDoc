# CoviDoc
![Logo](https://i.postimg.cc/fb3DpzLM/covidoc-logo-motto.png)

CoviDoc is an AI-powered medical assistant that classifies lung diseases and severity from X-rays using Convolutional Neural Networks. It also provides prescription and rehabilitation practices generation utilizing RAG-LLM architecture. Other features include PDF report generation, consultation management and account management.

## Core Workflow
![Workflow](https://i.postimg.cc/9QdGT2VF/covidoc-workflow.png)

## Development Tools
- Frontend: React with ViteJS, Tailwind CSS, Flowbite React
- Backend: Flask
- Database: SQLlite, SQLAlchemy, ChromaDB
- AI: Pytorch Lightning, WandB, LangChain, Gemini API, GradCam
- Report Generation: PDFKit
- Deployment: Nginx, Gunicorn, Docker, GCP


## Main Features
![App Screenshot](https://i.postimg.cc/d1G8wK1y/image.png)

![App Screenshot](https://i.postimg.cc/YCVgFSLF/image.png)

![App Screenshot](https://i.postimg.cc/Y09q81JC/image.png)

![App Screenshot](https://i.postimg.cc/wBQqpfzB/image.png)

![App Screenshot](https://i.postimg.cc/3xg7XSdZ/image.png)

![App Screenshot](https://i.postimg.cc/ZnBzCjGp/image.png)

![App Screenshot](https://i.postimg.cc/BZkGd9Fg/image.png)

![App Screenshot](https://i.postimg.cc/YjKZj7fB/image.png)

## Local Setup

### Backend
1. Download [Miniconda](https://docs.anaconda.com/miniconda/miniconda-install/)
2. Create environment
```bash
cd server
conda create -p ./env python=3.11 -y
conda activate ./env
```
3. Install requirements
```bash
# Windows
pip install -r requirements.txt
pip install -r requirements2.txt
# Linux or Unix-based
pip install -r linux_requirements.txt
```
4. Setup the .env file inside /server
```bash
# Entry point
FLASK_APP=application.py

# Flask secret key
SECRET_KEY='YOUR-SECRET-KEY'

# Database
DATABASE_URL=sqlite:///database.db
BUCKET_NAME='YOUR-GOOGLE-CLOUD-BUCKET-NAME'
GOOGLE_APPLICATION_CREDENTIALS='YOUR-GOOGLE-CLOUD-CREDENTIALS-JSON'

# Gemini
GEMINI_API_KEY='YOUR-GEMINI-API-KEY'

# Report generation path
WKHTML_PATH='YOUR-WKHTML-PATH'

# Mail config
MAIL_SERVER='YOUR-EMAIL-SERVER'
MAIL_PORT='YOUR-EMAIL-PORT'
MAIL_USERNAME='YOUR-EMAIL-USERNAME'
MAIL_APP_PASSWORD='YOUR-APP-PASSWORD'

# SERVER
CLIENT_SERVER_URL=http://localhost:5173
```

5. Download the model weights from [Drive](https://drive.google.com/drive/u/2/folders/1TpP7ds85-MoMSQ9r_nHCOg9FPqihmctC) and insert the .pth files into app/ml_models
```bash
/app/ml_models/covidnext50_clf.pth
/app/ml_models/covidnext50sev_clf.pth
```

6. Download the vector database from [Drive](https://drive.google.com/drive/u/2/folders/1TpP7ds85-MoMSQ9r_nHCOg9FPqihmctC) and insert the folder into app/machine_learning
```bash
/app/machine_learning/chromaDB
```

7. Start server
```
flask run
```

### Frontend
1. Download [Node.js](https://nodejs.org/en/download/prebuilt-installer)
2. Start the frontend
```
cd frontend
npm install
npm run dev
```

## Contributors

- Edrick Kesuma [@edkesuma](https://www.github.com/edkesuma)
- Zhu Hong Chen [@Nightingale0007](https://github.com/Nightingale0007)
- Tiffany Wynona Japara [@geethoobz](https://github.com/geethoobz)
- Karthikeyan Palanivelu [@pkarthikeyan98](https://github.com/pkarthikeyan98)
- Lai Wei Jie [@moomoolai](https://github.com/moomoolai)


