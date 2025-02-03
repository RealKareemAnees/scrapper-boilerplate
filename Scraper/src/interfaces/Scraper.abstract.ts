import { Configs } from '@/providers/configs/Configs';
import { ProgressType } from './progress.types';
import { Database } from '@/providers/database/Database';
import { ErrorFactory } from '@/providers/error-factory/ErrorFactory';
import { ErrorHandler } from '@/providers/error-handler/ErrorHandler';
import { ImageUploader } from '@/providers/image-uploader/ImageUploader';
import { Logger } from '@/providers/logger/logger';
import { Progress } from '@/providers/progress/Progress';

export abstract class ScraperAbstract {
    constructor() {}

    scrape(sessionType: ProgressType): void {
        throw new Error('Method not implemented.');
    }
}
