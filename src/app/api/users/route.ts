import { NextRequest, NextResponse } from 'next/server';
<<<<<<< HEAD
import { dynamoClient } from '@/lib/dynamo';
import { PutCommand, DeleteCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { initializeDynamoDB } from '@/lib/dynamo-init';
const TEST_MODE = process.env.TEST_MODE === 'dynamodb';
let isInitialized = false;

export async function GET() {
    try {
        if (TEST_MODE) {
            if (!isInitialized) {
                await initializeDynamoDB();
                isInitialized = true;
            }
            const { Items } = await dynamoClient.send(new ScanCommand({
                TableName: 'Users'
            }));
            return NextResponse.json(Items);
        }
        // const pgUsers = await prisma.user.findMany();
        return NextResponse.json([]);
    } catch (error) {
        console.error('Erreur GET:', error);
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}
export async function POST(req: NextRequest) {
    try {
        const { name, email } = await req.json();
        const id = Date.now().toString();

        if (TEST_MODE) {
            if (!isInitialized) {
                await initializeDynamoDB();
                isInitialized = true;
            }
            await dynamoClient.send(new PutCommand({
                TableName: 'Users',
                Item: { id, name, email, createdAt: new Date().toISOString() }
            }));
            return NextResponse.json({ id, name, email });
        }
        // const pgUser = await prisma.user.create({ data: { id, name, email } });
        return NextResponse.json({ id, name, email });
    } catch (error) {
        console.error('Erreur POST:', error);
=======
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users);
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { name, email } = await req.json();
        const newUser = await prisma.user.create({
            data: { name, email },
        });
        return NextResponse.json(newUser);
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
>>>>>>> dfd2ff401316fcd2f78ed04de928cedfcf9f920b
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();
<<<<<<< HEAD

        if (TEST_MODE) {
            if (!isInitialized) {
                await initializeDynamoDB();
                isInitialized = true;
            }
            await dynamoClient.send(new DeleteCommand({
                TableName: 'Users',
                Key: { id }
            }));
            return NextResponse.json({ message: 'Utilisateur supprimé' });
        }
        return NextResponse.json({ message: 'Mode DynamoDB désactivé' });
    } catch (error) {
        console.error('Erreur DELETE:', error);
        return NextResponse.json(
            { error: 'Échec de la suppression' },
            { status: 500 }
        );
=======
        await prisma.user.delete({
            where: { id },
        });
        return NextResponse.json({ message: 'Utilisateur supprimé' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
>>>>>>> dfd2ff401316fcd2f78ed04de928cedfcf9f920b
    }
}
