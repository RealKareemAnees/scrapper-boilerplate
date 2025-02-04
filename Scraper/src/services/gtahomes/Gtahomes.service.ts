import { ProgressType } from '@/interfaces/progress.types';
import { ProgressSessionSchemaInterface } from '@/interfaces/ProgressSessionSchema.interface';
import { ScraperAbstract } from '@/interfaces/Scraper.abstract';
import { SitemapChoice } from '@/interfaces/SitemapChoices.type';
import { Configs } from '@/providers/configs/Configs';
import { Database } from '@/providers/database/Database';
import { ErrorFactory } from '@/providers/error-factory/ErrorFactory';
import { ErrorHandler } from '@/providers/error-handler/ErrorHandler';
import { ImageUploader } from '@/providers/image-uploader/ImageUploader';
import { Logger } from '@/providers/logger/logger';
import { Progress } from '@/providers/progress/Progress';
import axios from 'axios';
import inquirer from 'inquirer';
import sitemapslist from './sitemapslist.json';
import { sleep } from '@/utils/sleep';
import { chooseSitemapLink } from './functions/chooseSStiemapLink.function';
import { parseSitemap } from './functions/pareseSitemap.function';

export class GtahomesService extends ScraperAbstract {
    private progressSession: ProgressSessionSchemaInterface = null;

    constructor(
        private configs: Configs,
        private database: Database,
        private errorFactory: ErrorFactory,
        private errorHandler: ErrorHandler,
        private imageUploader: ImageUploader,
        private logger: Logger,
        private progressProvider: Progress,
    ) {
        super();
    }

    public async scrape(progressType: ProgressType): Promise<void> {
        if (progressType === 'Continue scraping') {
            this.logger.info('Continuing scraping the last session...');
            this.progressSession =
                await this.progressProvider.pullLatestProgressSession();

            console.log(this.progressSession);

            await this.scrapeSession(this.progressSession.sessionURLS);
        } else if (progressType === 'Start new one') {
            const sitemapLink = await chooseSitemapLink(
                ['main', 'select', 'all', 'custome'] as SitemapChoice[],
                this.logger,
            );

            if (sitemapLink instanceof Array) {
                this.logger.info(
                    'Starting a new scraping session of all sitemaps in the list...',
                );

                this.logger.info('Starting a new scraping session...');

                for (const sitemap of sitemapslist.list) {
                    await sleep(1000);
                    this.progressSession =
                        await this.progressProvider.createNewProgressSession({
                            startTime: new Date().toUTCString(),
                            lastEdited: new Date().toUTCString(),
                            sessionURLS: await await parseSitemap(
                                sitemap,
                                this.logger,
                                this.errorFactory,
                            ),
                            currentURLIndex: 0,
                            scraper: 'gtahomes',
                        });

                    console.log(this.progressSession);

                    await this.scrapeSession(this.progressSession.sessionURLS);
                }
            } else {
                this.logger.info('Starting a new scraping session...');
                this.progressSession =
                    await this.progressProvider.createNewProgressSession({
                        startTime: new Date().toUTCString(),
                        lastEdited: new Date().toUTCString(),
                        sessionURLS: await parseSitemap(
                            sitemapLink,
                            this.logger,
                            this.errorFactory,
                        ),
                        currentURLIndex: 0,
                        scraper: 'gtahomes',
                    });

                console.log(this.progressSession);
            }
        }
    }

    async scrapeSession(sessionURLs: string[]) {
        // implement the scraping logic here
    }
}
