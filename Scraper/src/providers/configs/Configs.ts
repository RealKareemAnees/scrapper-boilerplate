import { ConstantsInterface } from '@/interfaces/Constants.interfacee';
export class Configs {
    constructor() {}

    public get<T>(key: keyof ConstantsInterface): T {
        return process.env[key] as T;
    }
}
