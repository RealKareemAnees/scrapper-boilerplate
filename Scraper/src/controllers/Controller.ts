import { StrategiesNameSpace } from '../interfaces/strategies.namespace';

export class Controller {
    constructor() {}

    public async startNewScrapingSession(
        strategyName: keyof typeof StrategiesNameSpace,
    ): Promise<void> {}

    public async resumeLatestScrapingSession(
        strategyName: keyof typeof StrategiesNameSpace,
    ): Promise<void> {}
}
