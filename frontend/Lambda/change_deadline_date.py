import boto3
import json
import os
from datetime import datetime, timedelta

def convert_utc_to_india(utc_datetime):
    ist_offset = timedelta(hours=5, minutes=30)
    india_datetime = utc_datetime + ist_offset

    india_date = india_datetime.strftime('%Y-%m-%d')
    india_time = india_datetime.strftime('%H:%M:%S')

    return india_date, india_time

def lambda_handler(event, context):

    dynamodb_client = boto3.client('dynamodb')
    postinformation_table_name = os.environ.get('POSTINFORMATIONTABLE')
    
    if 'body' in event:
        body = json.loads(event['body'])
    else:
        body = event
    
    utc_time = datetime.utcnow()
    current_date, current_time = convert_utc_to_india(utc_time)
    
    # Parse deadline date
    parsed_deadline_date = datetime.strptime(body['deadlineDate'], '%Y-%m-%d')
    deadline_date = parsed_deadline_date.strftime('%Y-%m-%d')
            
    # Check Status ActiveToClose
    if body['statusTo'] == 'Close':
        if deadline_date >= current_date:
            print('ActiveToCloseError')
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Headers" : "*",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
                'body': json.dumps({
                    "status": "Failed",
                })
            }
    # Status CloseToActive
    else:
        if deadline_date < current_date:
            print('CloseToActiveError')
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Headers" : "*",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
                'body': json.dumps({
                    "status": "Failed",
                })
            }
 
 
    try:
        dynamodb_client.update_item(
            TableName = postinformation_table_name,
            Key = {'PID': {'S': body['postId']}, 'PIT': {'S': body['informationTitle']}},
            UpdateExpression = "SET PDD = :newDeadlineDate",
            ExpressionAttributeValues = {":newDeadlineDate": {'S': deadline_date}},
        )

        return {
            'statusCode': 200,
            'body': json.dumps({
                "status": "Success",
            })
        }
    except Exception as e:
        print(f"Update failed: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({"status": "Failed"})
        }