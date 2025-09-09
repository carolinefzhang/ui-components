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
    
    # Ensure Content-Type header is properly set
    headers = event['headers']
    if not any(key.lower() == 'content-type' for key in headers.keys()):
        headers['Content-Type'] = 'application/json'
    
    # Use awsgi2 to adapt the Flask app to the Lambda event
    return awsgi2.response(app, event, context, base64_content_types={"image/png"})