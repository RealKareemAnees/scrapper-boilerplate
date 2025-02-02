import { AppErrorInterface } from '@/interfaces/AppError.intreface';

export abstract class AppError extends Error implements AppErrorInterface {
    public message: string;
    public details: any;

    constructor(message: string, details?: any) {
        super(message);
        this.message = message;
        this.details = details || null;
    }
}
