from app.extensions import bcrypt
from google.cloud import storage

def allowed_file(filename:str):
    ALLOWED_EXTENSIONS = {'heic', 'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extractExtension(filename:str) -> str:
    return filename.rsplit('.', 1)[1].lower()

def hashPassword(password:str) -> bytes:
	return bcrypt.generate_password_hash(password)

def uploadToGoogleCloud(bucketName, destinationBlobName, sourceFile, contentType="image/jpeg"):
    """Uploads a file to the bucket."""
    storageClient = storage.Client()
    bucket = storageClient.bucket(bucketName)
    blob = bucket.blob(destinationBlobName)

    blob.upload_from_file(sourceFile, content_type=contentType)

    return blob.public_url