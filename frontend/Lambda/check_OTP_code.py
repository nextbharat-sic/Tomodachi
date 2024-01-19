import json
import boto3
import os

def lambda_handler(event, context):
    dynamodb_client = boto3.client('dynamodb')
    if 'body' in event:
        body = json.loads(event['body'])
    else:
        body = event

    otp_table_name = os.environ.get('OTPTABLE')

    print(body)

    query_params = {
        'TableName': otp_table_name,
        'KeyConditionExpression': 'OPN = :phoneNumber',
        'ExpressionAttributeValues': {':phoneNumber': {'S': body['phoneNumber'] }},
        }
    response = dynamodb_client.query(**query_params)

    if len(response['Items']) == 1:
        data_otp_code = response['Items'][0]['OOC']['S']
        data_phone_number = response['Items'][0]['OPN']['S']

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
                "status": "OTP code has not be generated",
            })
        }

    if body['otp'] == data_otp_code and body['phoneNumber'] == data_phone_number:
        if body['clientPage'] == "signUp":
            response = boto3.client('lambda').invoke(
            FunctionName = 'register_user_information',
            InvocationType='RequestResponse',
            Payload = json.dumps(body)
            )
            body = json.loads(response['Payload'].read())
            return body
        elif body['clientPage'] == "logIn":
            response = boto3.client('lambda').invoke(
            FunctionName = 'check_user_information',
            InvocationType='RequestResponse',
            Payload = json.dumps(body)
            )
            body = json.loads(response['Payload'].read())
            return body
        else:
            return {
            'statusCode': 200,
            'headers': {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Headers" : "*",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
            'body': json.dumps({"status": "Request from wrong page"})
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
            'body': json.dumps({"status": "OTP and phone number are not matched"})
        }
