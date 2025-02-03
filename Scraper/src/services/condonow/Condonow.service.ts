import { ProgressType } from '@/interfaces/progress.types';
import { ProgressSessionSchemaInterface } from '@/interfaces/ProgressSessionSchema.interface';
import { ScraperAbstract } from '@/interfaces/Scraper.abstract';
import { Configs } from '@/providers/configs/Configs';
import { Database } from '@/providers/database/Database';
import { ErrorFactory } from '@/providers/error-factory/ErrorFactory';
import { ErrorHandler } from '@/providers/error-handler/ErrorHandler';
import { ImageUploader } from '@/providers/image-uploader/ImageUploader';
import { Logger } from '@/providers/logger/logger';
import { Progress } from '@/providers/progress/Progress';

export class CondnowService extends ScraperAbstract {
    constructor(
        configs: Configs,
        database: Database,
        errorFactory: ErrorFactory,
        errorHandler: ErrorHandler,
        imageUploader: ImageUploader,
        logger: Logger,
        progress: Progress,
    ) {
        super(
            configs,
            database,
            errorFactory,
            errorHandler,
            imageUploader,
            logger,
            progress,
        );
    }
    public async scrape(progressType: ProgressType): Promise<void> {
        console.log('progressType', progressType);
    }
}
