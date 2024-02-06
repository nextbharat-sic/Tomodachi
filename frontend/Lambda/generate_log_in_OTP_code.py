import json
import boto3
import os
import pyotp

def lambda_handler(event, context):
    
    if 'body' in event:
        body = json.loads(event['body'])
    else:
        body = event
    print(body)
    
    # check phone number
    dynamodb_client = boto3.client('dynamodb')
    user_table_name = os.environ.get('USERTABLE')
    
    query_params = {
        'TableName': user_table_name,
        'IndexName': 'UPN-index',
        'KeyConditionExpression': 'UPN = :phoneNumber',
        'ExpressionAttributeValues': {':phoneNumber': {'S': body['phoneNumber'] }},
        }
    response = dynamodb_client.query(**query_params)    

    if len(response['Items']) == 1:
        data_user_name = response['Items'][0]['UAN']['S']
        data_phone_number = response['Items'][0]['UPN']['S']
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
    
    if body['phoneNumber'] == data_phone_number:
        # generate otp code
        dynamodb = boto3.resource('dynamodb')
        totp = pyotp.TOTP(pyotp.random_base32())
        totp_number = totp.now()
        print(totp_number)
        
        otp_table_name = os.environ.get('OTPTABLE')
        table = dynamodb.Table(otp_table_name)
    
        response = table.put_item(
            Item = {
                'OPN': body['phoneNumber'],
                'OOC': totp_number
            }
        )
        
        # send sms
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
                "status": "Match",
                "userID": data_userID,
                "userName": data_user_name
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