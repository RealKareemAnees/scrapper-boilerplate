import { AppError } from '@/interfaces/AppError.abstract';

export function isAppError(error: Error): boolean {
    return error instanceof AppError;
}
