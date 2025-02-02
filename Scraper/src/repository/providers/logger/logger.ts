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
        this.log(message, 'cyan', this.className, 'start');
    }

    succeeed(message: string) {
        this.log(message, 'green', this.className, 'succeed');
    }

    fail(message: string) {
        this.log(message, 'gray', this.className, 'fail');
    }

    error(message: string) {
        this.log(message, 'red', this.className, 'error');
    }

    info(message: string) {
        this.log(message, 'magenta', this.className, 'info');
    }
}
