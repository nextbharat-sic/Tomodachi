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
    dynamodb_resource=boto3.resource('dynamodb')
    post_information_table_name = os.environ.get('POSTINFORMATIONTABLE')
    post_access_table_name = os.environ.get('ACCESSTABLE')

    query_params = {
        'TableName': post_information_table_name,
        'IndexName': 'PIT-PCT-index',
        'KeyConditionExpression': 'PIT = :information_title',
        'ExpressionAttributeValues': {':information_title': {'S': body['informationTitle']}},
        'ScanIndexForward': False,
        }

    response = dynamodb_client.query(**query_params)

    ist_offset = timedelta(hours=5, minutes=30)
    utc_datetime = datetime.utcnow()
    india_datetime = utc_datetime + ist_offset
    india_date = india_datetime.strftime('%Y-%m-%d')

    post_list = []
    display_list = []
    active_list = []
    close_list = []

    for item in response['Items']:
        if not item['PDD']['S']:
            display_list.append(item)
        elif item['PDD']['S'] >= india_date:
            active_list.append(item)
        elif item['PDD']['S'] < india_date:
            close_list.append(item)
    upload_data_list = display_list + active_list + close_list

    for upload_item in upload_data_list:
        pct = upload_item['PCT']['S'].split('_')[0] + '/' + upload_item['PCT']['S'].split('_')[1]
        pmd_list = []
        for pmd in upload_item['PMD']['L']:
            pmd_list.append(pmd['S'])


        post_list.append({
            'PCT':pct,
            'PMD':pmd_list,
            'PDE':upload_item['PDE']['S'],
            'PTP':upload_item['PTP']['S'],
            'PID':upload_item['PID']['S'],
            'PMJ':upload_item['PMJ']['S'],
            'PDD':upload_item['PDD']['S'],
            'PST':upload_item['PST']['BOOL'],
            'PUID':upload_item['PUID']['S'],
            'PTI':upload_item['PTI']['S'],
            'PIT':upload_item['PIT']['S'],
            'PAN':upload_item['PAN']['S'],
            'PPN':upload_item['PPN']['S'],
            'PFT':upload_item['PFT']['S'],
            'PCN':upload_item['PCN']['S'],
        })

    print(post_list)

    partition_key_value = india_date
    table=dynamodb_resource.Table(post_access_table_name)

    response = dynamodb_client.query(
        TableName=post_access_table_name,
        KeyConditionExpression='ADT = :Date',
        ExpressionAttributeValues={
            ':Date': {'S': partition_key_value}
        }
    )


    items = response['Items']
    if items:
        table.put_item(
            Item = {
                'ADT': india_date,
                'APD': int(items[0]['APD']['N'])+1
            })
    else:
        table.put_item(
            Item = {
                'ADT': india_date,
                'APD': 1
            })



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
