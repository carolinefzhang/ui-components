from app import app

def lambda_handler(event, context):
    """AWS Lambda handler function"""
    
    # Extract HTTP method and path
    http_method = event.get('httpMethod', 'POST')
    path = event.get('path', '/')
    
    # Handle preflight OPTIONS request
    if http_method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    # Create Flask test client
    with app.test_client() as client:
        # Extract headers and ensure proper content type
        headers = event.get('headers', {})
        content_type = headers.get('content-type') or headers.get('Content-Type', 'application/json')
        
        # Make request to Flask app
        response = client.open(
            path=path,
            method=http_method,
            data=event.get('body', ''),
            content_type=content_type
        )
        
        return {
            'statusCode': response.status_code,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
            'body': response.get_data(as_text=True)
        }