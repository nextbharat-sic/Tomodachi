import boto3
import json
import os

def lambda_handler(event, context):
    dynamodb_client = boto3.client('dynamodb')
    if 'body' in event:
        body = json.loads(event['body'])
    else:
        body = event
    
    user_table_name = os.environ.get('USERTABLE')

    print(body)
    
    query_params = {
        'TableName': user_table_name,
        'IndexName': 'UPN-index',
        'KeyConditionExpression': 'UPN = :phoneNumber',
        'ExpressionAttributeValues': {':phoneNumber': {'S': body['phoneNumber'] }},
        }
    response = dynamodb_client.query(**query_params)    

    if len(response['Items']) == 1:
        data_userName = response['Items'][0]['UNM']['S']
        data_phoneNumber = response['Items'][0]['UPN']['S']
        data_userID = response['Items'][0]['UID']['S']

    else:
        return { 
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Headers" : "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            'body': json.dumps({
                "status": "Unmatch",
            })
        }
    
    if body['userName'] == data_userName and body['phoneNumber'] == data_phoneNumber:
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
                "userID": data_userID,
            })
        }
    else:
        return { 
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Headers" : "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            'body': json.dumps({
                "status": "Unmatch",
            })
        }
          