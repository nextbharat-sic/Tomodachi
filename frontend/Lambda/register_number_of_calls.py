import json
import boto3
import os
from datetime import datetime, timedelta

def lambda_handler(event, context):

    if 'body' in event:
        body = json.loads(event['body'])
    else:
        body = event
    print(body)

    dynamodb = boto3.resource('dynamodb')
    number_of_calls = os.environ.get('NUMBEROFCALLS')
    table = dynamodb.Table(number_of_calls)

    ist_offset = timedelta(hours=5, minutes=30)
    utc_datetime = datetime.utcnow()
    india_datetime = utc_datetime + ist_offset
    india_date = india_datetime.strftime('%Y-%m-%d')

    dynamodb_client = boto3.client('dynamodb')
    query_params = {
        'TableName': number_of_calls,
        'KeyConditionExpression': 'NCN = :contactNumber',
        'ExpressionAttributeValues': {':contactNumber': {'S': body['contactNumber'] }},
        }

    response = dynamodb_client.query(**query_params)

    items = response['Items']
    if items:
        table.put_item(
        Item = {
            'NCN': body['contactNumber'],
            'NCD': india_date,
            'NNC': int(items[0]['NNC']['N'])+1
            }
        )

    else:
        table.put_item(
        Item = {
            'NCN': body['contactNumber'],
            'NCD': india_date,
            'NNC': 1
            }
        )

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Headers" : "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        'body': json.dumps("Success")
    }