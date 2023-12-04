import boto3
import json
import os
from datetime import datetime


def lambda_handler(event, context):

    dynamodb_client = boto3.client('dynamodb')

    time = datetime.now().isoformat()
    date = time.rsplit('T')[0]

    if 'body' in event:
        body = json.loads(event['body'])
    else:
        body = event

    postinformation_table_name = os.environ.get('POSTINFORMATIONTABLE')
    counter_table_name = os.environ.get('COUNTERTABLE')

    # Validation check
    if body['deadlineDate'] < date:
        print('deadlineDateError')
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Headers" : "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            'body': json.dumps('Failed')
        }

    # Get most recentry userId from CounterTable
    counter_res = dynamodb_client.get_item(
        TableName=counter_table_name,
        Key={
            'CTN': {'S': 'PostInformationTable'}
        },
    )

    next_upload_info_id = int(counter_res['Item']['CLI']['N']) + 1

    # Update number of user counter
    counter_table_operation = {
        'Update' : {
            'TableName' : counter_table_name,
            'Key' : {
                'CTN': {'S': 'PostInformationTable'}
            },
            'UpdateExpression' : "ADD CLI :inc",
            'ExpressionAttributeValues' : {":inc": {"N": "1"}},
        },
    }

   # Data formatting
    upload_info = {}
    upload_info['PID'] = 'P'+ str(next_upload_info_id).zfill(8)
    upload_info['PIT'] = body['informationTitle']
    upload_info['PCT'] = time
    upload_info['PDD'] = body['deadlineDate']
    upload_info['PJD'] = body['jobDescription']
    upload_info['PJT'] = body['jobTitle']
    upload_info['PMJ'] = body['modeOfJob']
    upload_info['PST'] = True
    upload_info['PTP'] = 'Post'
    upload_info['PUID'] = str(body['userId']).replace('U','P')
    upload_info['PUT'] = time

    # Upload data into Post Job Information Table
    upload_table_operation = {
       'Put': {
           'TableName' : postinformation_table_name,
           'Item' : {
               'PID' : {'S': upload_info['PID']},
               'PIT' : {'S': upload_info['PIT']},
               'PCT' : {'S': upload_info['PCT']},
               'PDD' : {'S': upload_info['PDD']},
               'PJD' : {'S': upload_info['PJD']},
               'PJT' : {'S': upload_info['PJT']},
               'PMJ' : {'S': upload_info['PMJ']},
               'PST' : {'BOOL': upload_info['PST']},
               'PTP' : {'S': upload_info['PTP']},
               'PUID': {'S': upload_info['PUID']},
               'PUT' : {'S': upload_info['PUT']},
           },
       }
    }

    try:
        response = dynamodb_client.transact_write_items(
            TransactItems=[
                counter_table_operation,
                upload_table_operation
            ]
        )
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Headers" : "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            'body': "Success"
        }
    except Exception as e:
        print(f"Transaction failed: {e}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Headers" : "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            'body': "Failed"
        }
