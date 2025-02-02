import { ErrorFactory } from './providers/error-factory/ErrorFactory';
import { Logger } from './providers/logger/logger';

export class Repository {
    constructor() {}

    get ErrorFactory(): ErrorFactory {
        return new ErrorFactory();
    }

    get Logger(): typeof Logger {
        return Logger;
    }
}
