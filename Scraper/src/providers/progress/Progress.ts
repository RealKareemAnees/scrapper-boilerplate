import { ProgressSessionSchemaInterface } from '@/interfaces/ProgressSessionSchema.interface';
import { Database } from '../database/Database';
import { Configs } from '../configs/Configs';
import { Constants } from '@/interfaces/Constants.type';
import { Logger } from '../logger/logger';

export class Progress {
    private currentProgressSession: ProgressSessionSchemaInterface = null;

    private logger = new Logger('Progress');
    private db = Database.getInstance();
    private configs = new Configs();
    private currentProgressSessionObjectId: any;

    get getCurrentProgress(): ProgressSessionSchemaInterface {
        return this.currentProgressSession;
    }

    async createNewProgressSession(
        session: ProgressSessionSchemaInterface,
    ): Promise<ProgressSessionSchemaInterface> {
        this.logger.info('Creating new progress session...');
        this.currentProgressSession = session;

        const objectId = await this.db.insertDocument(
            this.configs.get(Constants.PROGRESS_DB),
            this.configs.get(Constants.PROGRESS_COLLECTION),
            this.currentProgressSession,
        );

        this.currentProgressSessionObjectId = objectId;
        this.logger.info('Progress session created.');

        return this.getCurrentProgress;
    }

    async updateProgressSession(
        session: ProgressSessionSchemaInterface,
    ): Promise<void> {
        this.logger.info('Updating progress session...');
        this.currentProgressSession = session;

        await this.db.updateDocument(
            this.configs.get(Constants.PROGRESS_DB),
            this.configs.get(Constants.PROGRESS_COLLECTION),
            {
                _id: this.currentProgressSessionObjectId,
            },
            this.currentProgressSession,
        );

        this.logger.info('Progress session updated.');
    }

    async incrementProgressSession() {
        this.currentProgressSession.currentURLIndex += 1;
        await this.updateProgressSession(this.currentProgressSession);
    }

    async pullLatestProgressSession(): Promise<ProgressSessionSchemaInterface> {
        this.logger.info('Pulling latest progress session...');
        const progressSession = await this.db.retrieveLatestDocument(
            this.configs.get(Constants.PROGRESS_DB),
            this.configs.get(Constants.PROGRESS_COLLECTION),
        );

        this.currentProgressSession = progressSession;
        this.currentProgressSessionObjectId = progressSession._id;
        this.logger.info('Progress session pulled.');

        return this.getCurrentProgress;
    }
}
