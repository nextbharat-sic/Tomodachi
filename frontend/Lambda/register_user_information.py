# Copyright © 2025 Suzuki Motor Corporation All Rights Reserved
import boto3
import json
from datetime import datetime
import os

def lambda_handler(event, context):
    dynamodb_client = boto3.client('dynamodb')

    time = datetime.now().isoformat()

    if 'body' in event:
        body = json.loads(event['body'])
    else:
        body = event

    user_table_name = os.environ.get('USERTABLE')
    counter_table_name = os.environ.get('COUNTERTABLE')

    print(body)

    # Get most recentry userId from CounterTable
    counter_res = dynamodb_client.get_item(
        TableName=counter_table_name,
        Key={
            'CTN': {'S': 'UserTable'}
        },
    )

    next_user_id = int(counter_res['Item']['CLI']['N']) + 1

    # Update number of user counter
    counter_table_operation = {
        'Update' : {
            'TableName' : counter_table_name,
            'Key' : {
                'CTN': {'S': 'UserTable'}
            },
            'UpdateExpression' : "ADD CLI :inc",
            'ExpressionAttributeValues' : {":inc": {"N": "1"}},
        },
    }

    # Data formating
    user_info = {}
    user_info['UID'] = 'U' + str(next_user_id).zfill(6)
    user_info['UNM'] = body['userName']
    user_info['UAN'] = body['accountName']
    user_info['UPN'] = body['phoneNumber']
    user_info['UPC'] = body['privacyPolicyCheck']
    user_info['UCT'] = time
    user_info['UUT'] = time

    # Put data to UserTable
    user_table_operation = {
        'Put' : {
            'TableName' : user_table_name,
            'Item' : {
                'UID' : {'S': user_info['UID']},
                'UNM' : {'S': user_info['UNM']},
                'UAN' : {'S': user_info['UAN']},
                'UPN' : {'S': user_info['UPN']},
                'UPC' : {'BOOL': user_info['UPC']},
                'UCT' : {'S': user_info['UCT']},
                'UUT' : {'S': user_info['UUT']}
            },
        }
    }

    # Transaction processing
    try:
        response = dynamodb_client.transact_write_items(
            TransactItems=[
                counter_table_operation,
                user_table_operation
            ]
        )
        return {
            'statusCode': 200,
            'body': {
                "status": "Success",
                "userID": user_info["UID"]
                }
        }
    except Exception as e:
        print(f"Transaction failed: {e}")
        return {
            'statusCode': 500,
            'body': {"status": "Failed"}
        }
