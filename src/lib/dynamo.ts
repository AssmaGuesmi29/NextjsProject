import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const config = {
    region: process.env.AWS_REGION || "local",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "fakeMyKeyId",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "fakeSecretAccessKey",
    },
    endpoint: process.env.DYNAMODB_ENDPOINT ?? "http://dynamodb:8000",

};

export const dynamoClient = new DynamoDBClient(config);
