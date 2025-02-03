import { ProgressType } from './progress.types';

export interface ScraperInterface {
    scrape(sessionType: ProgressType);
}
