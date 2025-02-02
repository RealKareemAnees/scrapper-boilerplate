import { ProgressSessionSchemaInterface } from '@/interfaces/ProgressSessionSchema.interface';
import { ScraperInterface } from '@/interfaces/Scraper.interface';

export class Service {
    constructor(
        private readonly strategy: ScraperInterface,
        private readonly session: ProgressSessionSchemaInterface,
    ) {}

    public async scrape(strategyName: string): Promise<void> {}
}
