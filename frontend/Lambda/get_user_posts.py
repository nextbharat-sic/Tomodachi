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

    dynamodb_client = boto3.client('dynamodb')
    post_information_table_name = os.environ.get('POSTINFORMATIONTABLE')

    query_params = {
        'TableName': post_information_table_name,
        'IndexName': 'PUID-PCT-index',
        'KeyConditionExpression': 'PUID = :userID',
        'ExpressionAttributeValues': {':userID': {'S': body['userID']}},
        'ScanIndexForward': False,
        }

    response = dynamodb_client.query(**query_params)

    post_list = []

    for item in response['Items']:
        pct = item['PCT']['S'].split('_')[0] + '/' + item['PCT']['S'].split('_')[1]
        pmd_list = []
        for pmd in item['PMD']['L']:
            pmd_list.append(pmd['S'])


        post_list.append({
            'PCT':pct,
            'PMD':pmd_list,
            'PDE':item['PDE']['S'],
            'PTP':item['PTP']['S'],
            'PID':item['PID']['S'],
            'PMJ':item['PMJ']['S'],
            'PDD':item['PDD']['S'],
            'PST':item['PST']['BOOL'],
            'PUID':item['PUID']['S'],
            'PTI':item['PTI']['S'],
            'PIT':item['PIT']['S'],
            'PAN':item['PAN']['S'],
            'PPN':item['PPN']['S'],
            'PFT':item['PFT']['S'],
            'PCN':item['PCN']['S'],
        })

    print(post_list)

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Headers" : "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        'body': json.dumps(post_list)
    }
