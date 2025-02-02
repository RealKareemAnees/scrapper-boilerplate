import { SystemError } from '@/Errors/SystemError';
import { Logger } from '../logger/logger';

const logger = new Logger('ErrorHandler');

export function handleSystemError(error: SystemError) {
    logger.error(`${error.name}: ${error.message}`);
    console.warn('Network error: ', error.details);
}
