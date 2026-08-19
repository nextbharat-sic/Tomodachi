# Copyright © 2025 Suzuki Motor Corporation All Rights Reserved
import json
import pyotp
import boto3
import os

def lambda_handler(event, context):

    if 'body' in event:
        body = json.loads(event['body'])
    else:
        body = event
    print(body)

    dynamodb_client = boto3.client('dynamodb')
    user_table_name = os.environ.get('USERTABLE')
    counter_table_name = os.environ.get('COUNTERTABLE')


    # Validation check
    if " " in body['accountName']:
        print('accountNameIncludesSpaceError')
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Headers" : "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            'body': json.dumps({
                "status": json.dumps('Failed'),
            })
        }
    if not isinstance(body['privacyPolicyCheck'], bool):
        print('privacyPolicyCheckError')
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Headers" : "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            'body': json.dumps({
                "status": json.dumps('Failed'),
            })
        }
    if (len(body['phoneNumber']) != 10) or (not(str.isdecimal(body['phoneNumber']))):
        print('phoneNumberError')
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Headers" : "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            'body': json.dumps({
                "status": json.dumps('Failed'),
            })
        }

    # Check account name
    query_UAN_params = {
        'TableName': user_table_name,
        'IndexName': 'UAN-index',
        'KeyConditionExpression': 'UAN = :accountName',
        'ExpressionAttributeValues': {':accountName': {'S': body['accountName'] }},
        }

    UAN_response = dynamodb_client.query(**query_UAN_params)
    if UAN_response['Items']:
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Headers" : "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            'body': json.dumps({
                "status": "UAN Existed",
            })
        }

    # Check phone number
    query_UPN_params = {
        'TableName': user_table_name,
        'IndexName': 'UPN-index',
        'KeyConditionExpression': 'UPN = :phoneNumber',
        'ExpressionAttributeValues': {':phoneNumber': {'S': body['phoneNumber'] }},
        }

    UPN_response = dynamodb_client.query(**query_UPN_params)
    if UPN_response['Items']:
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Headers" : "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            'body': json.dumps({
                "status": "UPN Existed",
            })
        }

    totp = pyotp.TOTP(pyotp.random_base32())
    totp_number = totp.now()
    print(totp_number)

    dynamodb = boto3.resource('dynamodb')
    otp_table_name = os.environ.get('OTPTABLE')
    table = dynamodb.Table(otp_table_name)

    response = table.put_item(
        Item = {
            'OPN': body['phoneNumber'],
            'OOC': totp_number
        }
    )


    sns = boto3.client('sns', region_name='ap-south-1')

    message = f"{totp_number} is your Tomodachi OTP. Do not share it with anyone."
    sns.publish(
        PhoneNumber = "+91" + body['phoneNumber'],
        Message = message
    )

    return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Headers" : "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            'body': json.dumps({
                "status": "Success",
            })
        }
