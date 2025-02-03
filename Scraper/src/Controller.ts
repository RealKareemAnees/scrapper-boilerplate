import { ProgressType } from './interfaces/progress.types';
import { StrategiesNameSpace } from './interfaces/strategies.namespace';
import { CondnowService } from './services/Condonow.service';
import { GtahomesService } from './services/Gtahomes.service';
export class Controller {
    constructor() {}

    async startScraping(
        strategyName: keyof typeof StrategiesNameSpace,
        progressType: ProgressType,
    ): Promise<void> {
        if (strategyName == StrategiesNameSpace.condonow) {
            const condonowService = new CondnowService();
            await condonowService.scrape(progressType);
        }
        if (strategyName == StrategiesNameSpace.gtahomes) {
            const gtahomesService = new GtahomesService();
            await gtahomesService.scrape(progressType);
        }
    }
}
