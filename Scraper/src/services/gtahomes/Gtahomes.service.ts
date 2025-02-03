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
        }

        if (progressType === 'Start new one') {
            const sitemapLink = await this.chooseSitemapLink();

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
                            sessionURLS: await this.parseSitemap(sitemap),
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
                        sessionURLS: await this.parseSitemap(
                            sitemapLink as string | undefined,
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

    public async chooseSitemapLink(
        choices: SitemapChoice[] = ['main', 'select', 'all', 'custome'],
    ): Promise<string | string[] | undefined> {
        const { sitemapChoice } = await inquirer.prompt([
            {
                type: 'list',
                name: 'sitemapChoice',
                message: 'which sitemap do you want to scrape?',
                choices,
            },
        ]);

        if (sitemapChoice === 'main') return undefined;

        if (sitemapChoice === 'select') {
            const { sitemapLink } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'sitemapLink',
                    message: 'choose a sitemap link',
                    choices: sitemapslist.list,
                },
            ]);

            return sitemapLink;
        }

        if (sitemapChoice === 'all') {
            this.logger.warn(
                'all sitemaps in the list will be scraped sequentially, which may take a long time.',
            );

            const { proceed } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'proceed',
                    message: 'are you sure you want to proceed?',
                    choices: ['yes', ' return to previous step'],
                },
            ]);

            if (proceed === 'yes') return sitemapslist.list;
            return this.chooseSitemapLink();
        }

        if (sitemapChoice === 'custome') {
            const { sitemapLink } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'sitemapLink',
                    message: 'enter custome sitemap link',
                },
            ]);

            return sitemapLink;
        }

        return sitemapChoice;
    }

    private async parseSitemap(
        sitemapLink: string = 'https://www.gta-homes.com/post-sitemap.xml',
    ): Promise<string[]> {
        this.logger.start('Parsing sitemap ' + sitemapLink + ' for urls...');

        const sitemap = await this.pullSItemap(sitemapLink);
        const urls = sitemap.match(/<(?:image:)?loc>(.*?)<\/(?:image:)?loc>/g);

        this.logger.succeeed('Sitemap has pulled and parsed successfully.');

        return urls.map((url) => {
            console.log(url);
            return url.replace(/<(?:image:)?loc>|<\/(?:image:)?loc>/g, '');
        });
    }

    private async pullSItemap(sitemapLink): Promise<string> {
        this.logger.start('Pulling sitemap' + sitemapLink + '...');
        return (await axios.get(sitemapLink)).data;
    }
}
