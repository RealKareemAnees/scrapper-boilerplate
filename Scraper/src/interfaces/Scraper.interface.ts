export interface ScraperInterface {
    scrape(): Promise<void>;
    pullSiteMap(): Promise<string[]>;
}
