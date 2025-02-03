import { NetworkError } from '@/Errors/NetworkError';
import { SystemError } from '@/Errors/SystemError';
import { AppError } from '@/interfaces/AppError.abstract';
import { handleSystemError } from './handleSystemError';
import { handleNetworkError } from './handleNetworkError';

export class ErrorHandler {
    private static instance: ErrorHandler;

    constructor() {
        if (!ErrorHandler.instance) {
            ErrorHandler.instance = this;
        }
        return ErrorHandler.instance;
    }

    static getInstance(): ErrorHandler {
        if (!ErrorHandler.instance) {
            ErrorHandler.instance = new ErrorHandler();
        }
        return ErrorHandler.instance;
    }

    handle(error: AppError) {
        if (error instanceof NetworkError) {
            handleNetworkError(error);
            return;
        }
        if (error instanceof SystemError) {
            handleSystemError(error);
            return;
        }
    }
}
