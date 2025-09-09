from app import app

def lambda_handler(event, context):
    """AWS Lambda handler function"""
    
    # Extract HTTP method and path
    http_method = event.get('httpMethod', 'POST')
    path = event.get('path', '/')
    
    # Create Flask test client
    with app.test_client() as client:
        # Make request to Flask app
        response = client.open(
            path=path,
            method=http_method,
            headers=event.get('headers', {}),
            data=event.get('body', ''),
            content_type=event.get('headers', {}).get('Content-Type', 'application/json')
        )
        
        return {
            'statusCode': response.status_code,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': response.get_data(as_text=True)
        }