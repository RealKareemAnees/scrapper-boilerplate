import { NetworkError } from '@/Errors/NetworkError';
import { Logger } from '../logger/logger';

const logger = new Logger('ErrorHandler');

export function handleNetworkError(error: NetworkError) {
    logger.error(`${error.name}: ${error.message}`);
    console.warn('Network error: ', error.details);
}
