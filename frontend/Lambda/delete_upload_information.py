# Copyright © 2025 Suzuki Motor Corporation All Rights Reserved
import boto3
import json
import os

def lambda_handler(event, context):

    dynamodb_client = boto3.client('dynamodb')
    postinformation_table_name = os.environ.get('POSTINFORMATIONTABLE')
    
    if 'body' in event:
        body = json.loads(event['body'])
    else:
        body = event
        
    # Get 'PID' attribute value from DB
    response_Post_Data = dynamodb_client.get_item(
        TableName = postinformation_table_name,
        Key = {'PID': {'S': body['postId']}, 'PIT': {'S': body['informationTitle']}},
    )
    post_item = response_Post_Data.get('Item')
    
    if not post_item:
        print("PID not found")
        return {
                    'statusCode': 500,
                    'headers': {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Headers" : "*",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                    },
                    'body': json.dumps({"status": "Failed"})
                }
        
    # Delete upload information data
    try:
        dynamodb_client.delete_item(
            TableName = postinformation_table_name,
            Key = {'PID': {'S': body['postId']}, 'PIT': {'S': body['informationTitle']}},
        )

        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Headers" : "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            'body': json.dumps({"status": "Success"})
        }
    except Exception as e:
        print(f"Update failed: {e}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Headers" : "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            'body': json.dumps({"status": "Failed"})
        }
