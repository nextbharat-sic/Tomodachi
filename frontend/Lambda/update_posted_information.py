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

    print(body)

    utc_time = datetime.utcnow()
    create_date, create_time = convert_utc_to_india(utc_time)
    post_update_date = create_date+"_"+ create_time

    if body['category'] == 'jobMarket':
        # Parse deadline date
        parsed_deadline_date = datetime.strptime(body['deadlineDate'], '%Y-%m-%d')
        deadline_date = parsed_deadline_date.strftime('%Y-%m-%d')

        # Validation check
        if deadline_date < create_date:
            print('deadlineDateError')
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

    else:
        deadline_date = body['deadlineDate']

    if body['category'] == "contactBook":

        if(len(body['contactNumber']) != 10) or (not(str.isdecimal(body['contactNumber']))):
            print('contactNumberError')
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
            Key = {'PID' : {'S':body['postId']}, 'PIT': {'S':body['category']} },
            UpdateExpression = 'SET PTI = :title, PMJ = :mode_of_job, PFT = :for_which_thanda, PDD = :deadline_date, PDE = :description, #PUT = :update_date, PCN = :contact_number',
            ExpressionAttributeValues = {':title' : {'S':body['title']}, ':mode_of_job' : {'S':body['modeOfJob']}, ':for_which_thanda' : {'S':body['forWhichThanda']}, ':deadline_date' : {'S':deadline_date}, ':description' : {'S':body['description']}, ':update_date' : {'S':post_update_date}, ':contact_number' : {'S':body['contactNumber']}},
            ExpressionAttributeNames = {'#PUT': 'PUT'}
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
            'body': json.dumps({
                "status": "Failed",
            })
        }