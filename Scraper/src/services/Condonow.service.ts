import { ProgressType } from '@/interfaces/progress.types';
import { ProgressSessionSchemaInterface } from '@/interfaces/ProgressSessionSchema.interface';
import { ScraperInterface } from '@/interfaces/Scraper.interface';

export class CondnowService implements ScraperInterface {
    constructor() {}

    public async scrape(progressType: ProgressType): Promise<void> {}
}
