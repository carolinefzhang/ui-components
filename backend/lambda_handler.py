from app import app
import awsgi2
from flask_cors import CORS

# Enable CORS for all routes
CORS(app)

def lambda_handler(event, context):
    """AWS Lambda handler function"""
    
    # Standard API Gateway event handling
    event.setdefault('httpMethod', 'POST')
    event.setdefault('path', '/')
    event.setdefault('headers', {})
    event.setdefault('queryStringParameters', {})
    event.setdefault('body', '')
    
    return awsgi2.response(app, event, context, base64_content_types={"image/png"})