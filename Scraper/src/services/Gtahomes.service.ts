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

export class GtahomesService extends ScraperAbstract {
    constructor(
        arg1: Configs,
        arg2: Database,
        arg3: ErrorFactory,
        arg4: ErrorHandler,
        arg5: ImageUploader,
        arg6: Logger,
        arg7: Progress,
    ) {
        super(arg1, arg2, arg3, arg4, arg5, arg6, arg7);
    }

    public async scrape(progressType: ProgressType): Promise<void> {}
}
