import { AppError } from '@/interfaces/AppError.abstract';

export class SystemError extends AppError {
    constructor(message: string, details?: any) {
        super(message, details);
        this.name = 'SystemError';
    }
}
