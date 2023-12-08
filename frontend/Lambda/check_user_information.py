import boto3
import json
import os

def lambda_handler(event, context):

    if 'body' in event:
        body = json.loads(event['body'])
    else:
        body = event

    user_table_name = os.environ.get('USERTABLE')
    access_key_id = os.environ.get('ACCESSKEY')
    secret_access_key = os.environ.get('SECRETACCESSKEY')

    print(body)

    session = boto3.Session(region_name='ap-south-1',aws_access_key_id = access_key_id, aws_secret_access_key = secret_access_key)
    dynamodb_session = session.resource('dynamodb')
    table = dynamodb_session.Table(user_table_name)
    response = table.scan()
    data_userName = [item['UNM'] for item in response['Items']]
    data_phoneNumber = [item['UPN'] for item in response['Items']]
    if body['userName'] in data_userName and body['phoneNumber'] in data_phoneNumber:
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Headers" : "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            'body': json.dumps({
                "status": "Match",
            })
        }