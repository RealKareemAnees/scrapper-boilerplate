import colors from 'chalk';
import { info } from 'console';

export class Logger {
    public className: string;

    constructor(className: string) {
        this.className = className;
    }

    private log(
        message: string,
        color: string,
        className: string,
        status: string,
    ) {
        console.log(
            ` ${colors.bold[color](status)} [${colors.gray(new Date().toISOString())}] ${colors[
                'white'
            ].bold(className)} ${colors[color](message)}`,
        );
    }

    start(message: string) {
        this.log(message, 'blue', this.className, 'start');
    }

    succeeed(message: string) {
        this.log(message, 'green', this.className, 'succeed');
    }

    failure(message: string) {
        this.log(message, 'gray', this.className, 'fail');
    }

    error(message: string) {
        this.log(message, 'red', this.className, 'error');
    }

    info(message: string) {
        this.log(message, 'cyan', this.className, 'info');
    }

    warn(message: string) {
        this.log(message, 'yellow', this.className, 'warn');
    }

    magenta(message: string) {
        this.log(message, 'magenta', this.className, 'magenta');
    }
}
