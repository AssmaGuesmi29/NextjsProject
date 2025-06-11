import {  CreateTableCommand, ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { dynamoClient } from './dynamo';

export async function initializeDynamoDB() {
    try {
        const { TableNames } = await dynamoClient.send(new ListTablesCommand({}));
        if (TableNames?.includes('Users')) {
            console.log('✅ Table DynamoDB "Users" existe déjà');
            return;
        }

        await dynamoClient.send(new CreateTableCommand({
            TableName: 'Users',
            AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
            KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1
            }
        }));

        console.log('🚀 Table DynamoDB "Users" créée avec succès');
    } catch (error) {
        console.error('❌ Erreur d\'initialisation DynamoDB:', error);
        throw error;
    }
}
