import { ErrorHandler } from '@/providers/error-handler/ErrorHandler';
import { Logger } from '@/providers/logger/logger';

const logger = new Logger('WithRetry');

/**
 * @description This method is used to retry the operation that caused the error.
 */
export function WithRetry(retries: number, delay: number = 0): MethodDecorator {
    return function (target, propertyKey, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            let attempts = 0;
            while (attempts < retries) {
                try {
                    return await originalMethod.apply(this, args); // Call the original method
                } catch (error) {
                    attempts++;
                    if (attempts >= retries) {
                        logger.error(
                            `Operation completely failed after ${attempts} attempts, delegating to error handler...`,
                        );
                        ErrorHandler.getInstance().handle(error);
                        return;
                    }
                    logger.failure(
                        `Operation failed ${attempts} times, retrying...`,
                    );
                    if (delay > 0)
                        await new Promise((res) => setTimeout(res, delay)); // Wait before retrying
                }
            }
        };

        return descriptor;
    };
}
