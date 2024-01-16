import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient();

const dynamo = DynamoDBDocumentClient.from(client);

export const handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };


  try {

    const uuid = event?.queryStringParameters?.uuid
    const tableName = 'mintBE'
    
    let params = {
      TableName: tableName,
    }
    if (uuid) {
      params = {
        ...params,
        FilterExpression: '#myAttr = :uuidValue', 
        ExpressionAttributeNames: {
          '#myAttr': 'mintId', 
        },
        ExpressionAttributeValues: {
          ':uuidValue': uuid, 
        },
      };
    }
    console.log('params', params)
    // Create the ScanCommand
    const command = new ScanCommand(params);
    
    // Put item in DynamoDB
    const response = await dynamo.send(command);
    console.log('response', JSON.stringify(response))
    
    body = response.Items
    
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    return {
      statusCode,
      headers,
      body: JSON.stringify(body)
    };
  }

};
