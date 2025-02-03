import { ProgressType } from './interfaces/progress.types';
import { StrategiesNameSpace } from './interfaces/strategies.namespace';
import { Configs } from '@/providers/configs/Configs';
import { Database } from '@/providers/database/Database';
import { ErrorFactory } from '@/providers/error-factory/ErrorFactory';
import { ErrorHandler } from '@/providers/error-handler/ErrorHandler';
import { ImageUploader } from '@/providers/image-uploader/ImageUploader';
import { Logger } from '@/providers/logger/logger';
import { Progress } from '@/providers/progress/Progress';
import { CondnowService } from './services/condonow/Condonow.service';
import { GtahomesService } from './services/gtahomes/Gtahomes.service';
export class Controller {
    constructor() {}

    async startScraping(
        strategyName: keyof typeof StrategiesNameSpace,
        progressType: ProgressType,
    ): Promise<void> {
        if (strategyName == StrategiesNameSpace.condonow) {
            const condonowService = new CondnowService(
                new Configs(),
                new Database(),
                new ErrorFactory(),
                new ErrorHandler(),
                new ImageUploader(),
                new Logger('CondonowService'),
                new Progress(),
            );
            await condonowService.scrape(progressType);
        }
        if (strategyName == StrategiesNameSpace.gtahomes) {
            const gtahomesService = new GtahomesService(
                new Configs(),
                new Database(),
                new ErrorFactory(),
                new ErrorHandler(),
                new ImageUploader(),
                new Logger('GtahomesService'),
                new Progress(),
            );
            await gtahomesService.scrape(progressType);
        }
    }
}
