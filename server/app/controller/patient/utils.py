from app.extensions import bcrypt

def allowed_file(filename:str):
    ALLOWED_EXTENSIONS = {'heic', 'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extractExtension(filename:str) -> str:
    return filename.rsplit('.', 1)[1].lower()

def hashPassword(password:str) -> bytes:
	return bcrypt.generate_password_hash(password)