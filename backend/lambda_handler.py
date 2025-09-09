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
        # Make request to Flask app with proper JSON handling
        response = client.post(
            '/',
            json={'sudoku': [event.get('body', '')]},
            content_type='application/json'
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