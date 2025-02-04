import { ErrorFactory } from '@/providers/error-factory/ErrorFactory';
import { Logger } from '@/providers/logger/logger';
import axios from 'axios';

export async function parseSitemap(
    sitemapLink: string = 'https://www.gta-homes.com/post-sitemap.xml',
    logger: Logger,
    errorFactory: ErrorFactory,
): Promise<string[]> {
    try {
        logger.start('Parsing sitemap ' + sitemapLink + ' for urls...');

        const sitemap = (await axios.get(sitemapLink)).data;
        const urls = sitemap.match(/<(?:image:)?loc>(.*?)<\/(?:image:)?loc>/g);

        logger.succeeed('Sitemap has pulled and parsed successfully.');

        return urls.map((url) => {
            console.log(url);
            return url.replace(/<(?:image:)?loc>|<\/(?:image:)?loc>/g, '');
        });
    } catch (error) {
        logger.error('Error parsing sitemap: ' + error.message);
        throw errorFactory.createSystemError(
            'Error parsing sitemap: ' + error.message,
        );
    }
}
