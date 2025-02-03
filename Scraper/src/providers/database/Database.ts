import { WithRetry } from '@/decorators/WithRetry.decorator';
import { SystemError } from '@/Errors/SystemError';
import { Logger } from '../logger/logger';
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import { Configs } from '../configs/Configs';
import { Constants } from '@/interfaces/Constants.type';

const configs = new Configs();

/**
 * Database class
 * @description This class is singleton
 */
export class Database {
    private static instance: Database;
    private logger = new Logger('Database');

    constructor() {
        if (!Database.instance) {
            Database.instance = this;
        }
        return Database.instance;
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    private async executeWithConnection(
        fn: (client: MongoClient) => Promise<any>,
    ) {
        const client = new MongoClient(
            configs.get(Constants.MONGODB_CONNECTION_STRING),
        );
        try {
            await client.connect();
            return await fn(client);
        } catch (error) {
            throw new SystemError(error);
        } finally {
            await client.close();
        }
    }

    @WithRetry(
        Number(configs.get(Constants.DATABASE_RETRY_COUNT)),
        Number(configs.get(Constants.DATABASE_RETRY_DELAY)),
    )
    public async insertDocument(
        dbName: string,
        collectionName: string,
        document: any,
    ): Promise<ObjectId> {
        this.logger.start('Inserting document');
        return await this.executeWithConnection(async (client) => {
            const db = client.db(dbName);
            const collection = db.collection(collectionName);
            return (await collection.insertOne(document)).insertedId;
        });
        this.logger.succeeed('Document inserted');
    }

    @WithRetry(
        Number(configs.get(Constants.DATABASE_RETRY_COUNT)),
        Number(configs.get(Constants.DATABASE_RETRY_DELAY)),
    )
    public async retrieveDocument(
        dbName: string,
        collectionName: string,
        filter: any,
    ) {
        this.logger.start('Retrieving document');
        const document = await this.executeWithConnection(async (client) => {
            const db = client.db(dbName);
            const collection = db.collection(collectionName);
            return await collection.findOne(filter);
        });
        this.logger.succeeed('Document retrieved');
        return document;
    }

    @WithRetry(
        Number(configs.get(Constants.DATABASE_RETRY_COUNT)),
        Number(configs.get(Constants.DATABASE_RETRY_DELAY)),
    )
    public async updateDocument(
        dbName: string,
        collectionName: string,
        filter: {
            [key: string]: any;
        },
        document: any,
    ) {
        this.logger.start('Updating document');
        await this.executeWithConnection(async (client) => {
            const db = client.db(dbName);
            const collection = db.collection(collectionName);
            await collection.updateOne(filter, { $set: document });
        });
        this.logger.succeeed('Document updated');
    }

    @WithRetry(
        Number(configs.get(Constants.DATABASE_RETRY_COUNT)),
        Number(configs.get(Constants.DATABASE_RETRY_DELAY)),
    )
    public async retrieveLatestDocument(
        dbName: string,
        collectionName: string,
    ) {
        this.logger.start('Retrieving document');
        const document = await this.executeWithConnection(async (client) => {
            const db = client.db(dbName);
            const collection = db.collection(collectionName);
            return await collection.findOne({}, { sort: { _id: -1 } });
        });
        this.logger.succeeed('Document retrieved');
        return document;
    }
}
