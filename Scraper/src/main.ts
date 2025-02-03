import chalkAnimation from 'chalk-animation';
import { sleep } from './utils/sleep';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { exit } from './utils/exit';
import { Controller } from './Controller';
import { ProgressType } from './interfaces/progress.types';
import { StrategiesNameSpace } from './interfaces/strategies.namespace';
import { SitemapChoice } from './interfaces/SitemapChoices.type';

class Main {
    constructor() {}

    public static async main() {
        await Main.wellcome();
        console.log('');

        const scraper = await Main.chooseScraper();
        console.log('');

        const progress = await Main.chooseProgress();
        console.log('');

        console.log(chalk.bold.blue('Scraper: '), scraper);
        console.log(chalk.bold.blue('Progress: '), progress);

        console.log('');

        await Main.handleChoices(scraper, progress);
    }

    public static async wellcome() {
        const rainbow = chalkAnimation.rainbow('Wellcome to Scraper');

        await sleep(1000);

        rainbow.stop();

        console.log(
            chalk.bold.blue('This Artwork is made By Kareem: '),
            chalk.underline('https://github.com/RealKareemAnees'),
        );
    }

    public static async chooseScraper(
        choices: (keyof typeof StrategiesNameSpace)[] = [
            //@ts-ignore
            'condonow !Not implemented yet',
            'gtahomes',
        ],
    ) {
        const { scraper } = await inquirer.prompt([
            {
                type: 'list',
                name: 'scraper',
                message: 'Choose a scraper',
                choices,
            },
        ]);

        return scraper;
    }

    public static async chooseProgress(
        choices: (ProgressType | 'Exit')[] = [
            'Continue scraping',
            'Start new one',
            'Exit',
        ],
    ) {
        const { scraper } = await inquirer.prompt([
            {
                type: 'list',
                name: 'scraper',
                message: 'Do you want to continue scraping or start new one?',
                choices,
            },
        ]);

        return scraper;
    }

    public static async handleChoices(
        scraper: keyof typeof StrategiesNameSpace,
        progress: ProgressType | 'Exit',
        sitemapLink?: string,
    ) {
        if (progress === 'Exit') return exit(0);

        const controller = new Controller();

        return await controller.startScraping(scraper, progress, sitemapLink);
    }
}

Main.main();
