import { AppError } from '@/interfaces/AppError.abstract';

export class NetworkError extends AppError {
    constructor(message: string, details?: any) {
        super(message, details);
        this.name = 'NetworkError';
    }
}
