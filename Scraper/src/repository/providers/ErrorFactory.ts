import { NetworkError } from '@/Errors/NetworkError';
import { SystemError } from '@/Errors/SystemError';
import { AppError } from '@/interfaces/AppError.abstract';

export class ErrorFactory {
    createSystemError(message: string, details?: any): AppError {
        return new SystemError(message, details);
    }
    createNetworkError(message: string, details?: any): AppError {
        return new NetworkError(message, details);
    }
}
