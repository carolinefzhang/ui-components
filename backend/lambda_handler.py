from app import app
import awsgi2

def lambda_handler(event, context):
    """AWS Lambda handler function"""
    
    # Use awsgi2 to adapt the Flask app to the Lambda event
    return awsgi2.response(app, event, context, base64_content_types={"image/png"})