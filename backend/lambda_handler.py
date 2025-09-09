from app import app
import awsgi2

def lambda_handler(event, context):
    """AWS Lambda handler function"""
    
    # Ensure required fields exist in event
    event.setdefault('httpMethod', 'POST')
    event.setdefault('path', '/')
    event.setdefault('headers', {})
    event.setdefault('queryStringParameters', {})
    event.setdefault('body', '')
    
    # Fix headers to be case-insensitive and ensure proper content type
    headers = {k.lower(): v for k, v in event['headers'].items()}
    event['headers'] = headers
    headers['content-type'] = 'application/json'
    
    # Use awsgi2 to adapt the Flask app to the Lambda event
    return awsgi2.response(app, event, context, base64_content_types={"image/png"})