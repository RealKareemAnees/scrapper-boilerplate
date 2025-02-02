import { Constants } from '@/interfaces/Constants.type';
import { config } from 'dotenv';
import { join } from 'path';
export class Configs {
    constructor() {
        config({
            path: join(__dirname, '../../../.env'),
        });
    }

    public get(key: keyof typeof Constants): string {
        return process.env[key];
    }
}
