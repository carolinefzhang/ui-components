from app import app
import awsgi

def lambda_handler(event, context):
    """AWS Lambda handler function"""
    
    # Use awsgi to adapt the Flask app to the Lambda event
    return awsgi.response(app, event, context)