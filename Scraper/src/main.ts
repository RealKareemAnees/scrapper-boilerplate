import chalkAnimation from 'chalk-animation';
import { sleep } from './utils/sleep';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { exit } from './utils/exit';

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

    public static async chooseScraper() {
        const { scraper } = await inquirer.prompt([
            {
                type: 'list',
                name: 'scraper',
                message: 'Choose a scraper',
                choices: ['condonow', 'gta-homes'],
            },
        ]);

        return scraper;
    }

    public static async chooseProgress() {
        const { scraper } = await inquirer.prompt([
            {
                type: 'list',
                name: 'scraper',
                message: 'Do you want to continue scraping or start new one?',
                choices: ['Continue scraping', 'Start new one', 'Exit'],
            },
        ]);

        return scraper;
    }

    public static async handleChoices(scraper: string, progress: string) {
        if (progress === 'exit') return exit(0);
    }
}

Main.main();
