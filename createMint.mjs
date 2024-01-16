import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand
} from "@aws-sdk/lib-dynamodb";


const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const generateRandomNumber = () => {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString();
};

export const handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };


  try {
    const requestBody = JSON.parse(event.body);
    const { name, description, image } = requestBody;

    // Generate a random UUID using the uuid library
    const uuid = generateRandomNumber();


    // Put item in DynamoDB
    await dynamo.send(
          new PutCommand({
            TableName: 'mintBE',
            Item: {
              mintId: uuid,
              name: name,
              description: description,
              image : image ,
            },
          })
        );
  
  body = "Item minted successfully!"
    
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body: JSON.stringify(body),
    headers,
  };
};