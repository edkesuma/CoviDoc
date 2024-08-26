# CoviDoc
The project aims to assist doctors and medical professionals in COVID-19 detection by X-ray image classifications. Our product also provides consultation management.

## DEVELOPMENT TOOLS:
- Frontend: React with ViteJS, Tailwind CSS, Flowbite
- Backend: Flask
- Database: SQLlite, SQLAlchemy

## SETUP
### What to Install
FRONTEND
1. ReactJS
```
cd client
npm install
npm run dev
```

2. Node.js
Download here: https://nodejs.org/en/download/prebuilt-installer

BACKEND
1. Install Miniconda
Download here: https://docs.anaconda.com/miniconda/miniconda-install/
2. Create environment
```
cd server
conda create -p ./env python=3.11 -y
conda activate ./env
```
3. Install requirements
```
pip install -r requirements.txt
```
4. Start server
```
flask run
```
