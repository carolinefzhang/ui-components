#!/usr/bin/env python3
import json
from lambda_handler import lambda_handler

# Mock Lambda event for testing
test_event = {
    'httpMethod': 'POST',
    'path': '/',
    'headers': {
        'Content-Type': 'application/json'
    },
    'body': json.dumps({
        'sudoku': ['000000000000000000000000000000000000000000000000000000000000000000000000000000000']
    })
}

# Mock Lambda context
class MockContext:
    def __init__(self):
        self.function_name = 'test-function'
        self.aws_request_id = 'test-request-id'

if __name__ == '__main__':
    context = MockContext()
    
    print("Testing Lambda function locally...")
    print(f"Event: {json.dumps(test_event, indent=2)}")
    
    try:
        response = lambda_handler(test_event, context)
        print(f"\nResponse: {json.dumps(response, indent=2)}")
    except Exception as e:
        print(f"Error: {e}")