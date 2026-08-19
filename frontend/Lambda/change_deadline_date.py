# Copyright © 2025 Suzuki Motor Corporation All Rights Reserved
import boto3
import json
import os
from datetime import datetime, timedelta

def convert_utc_to_india(utc_datetime):
    ist_offset = timedelta(hours=5, minutes=30)
    india_datetime = utc_datetime + ist_offset
    india_date = india_datetime.strftime('%Y-%m-%d')
    return india_date

def lambda_handler(event, context):

    dynamodb_client = boto3.client('dynamodb')
    postinformation_table_name = os.environ.get('POSTINFORMATIONTABLE')

    if 'body' in event:
        body = json.loads(event['body'])
    else:
        body = event

    # Get 'PUID' attribute value from DB
    response_Post_Data = dynamodb_client.get_item(
        TableName = postinformation_table_name,
        Key = {'PID': {'S': body['postId']}, 'PIT': {'S': body['informationTitle']}},
    )
    post_item = response_Post_Data.get('Item')

    if not post_item:
        print("PUID not found")
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

    post_User_Id = post_item.get('PUID', {}).get('S')
    print("Post User Id: ", post_User_Id)

    # Check post-recruiter
    if body['postUserId'] != post_User_Id:
        print('User is not post-recruiter')
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

    utc_time = datetime.utcnow()
    current_date_india = convert_utc_to_india(utc_time)

    # Parse deadline date
    parsed_deadline_date = datetime.strptime(body['deadlineDate'], '%Y-%m-%d')
    deadline_date = parsed_deadline_date.strftime('%Y-%m-%d')

    print("deadline_date:" + deadline_date)
    print("current_date_india:" + current_date_india)
    # Check deadline date
    if deadline_date >= current_date_india:
        print('Deadline date must be smaller than current date')
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
    # Change deadline_date value in DB
    try:
        dynamodb_client.update_item(
            TableName = postinformation_table_name,
            Key = {'PID': {'S': body['postId']}, 'PIT': {'S': body['informationTitle']}},
            UpdateExpression = "SET PDD = :newDeadlineDate",
            ExpressionAttributeValues = {":newDeadlineDate": {'S': deadline_date}},
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
