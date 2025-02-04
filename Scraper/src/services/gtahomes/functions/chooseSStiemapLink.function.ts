import { SitemapChoice } from '@/interfaces/SitemapChoices.type';
import inquirer from 'inquirer';
import sitemapslist from '../sitemapslist.json';
import { Logger } from '@/providers/logger/logger';

export async function chooseSitemapLink(
    choices: SitemapChoice[] = ['main', 'select', 'all', 'custome'],
    logger: Logger,
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
        logger.warn(
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
        return chooseSitemapLink(choices, logger);
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
