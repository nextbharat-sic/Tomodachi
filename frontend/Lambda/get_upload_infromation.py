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
    
    ist_offset = timedelta(hours=5, minutes=30)
    utc_datetime = datetime.utcnow()
    india_datetime = utc_datetime + ist_offset
    india_date = india_datetime.strftime('%Y-%m-%d')
 
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
