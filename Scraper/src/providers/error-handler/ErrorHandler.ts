export class ErrorHandler {
    private static instance: ErrorHandler;

    private constructor() {}

    static getInstance(): ErrorHandler {
        if (!ErrorHandler.instance) {
            ErrorHandler.instance = new ErrorHandler();
        }
        return ErrorHandler.instance;
    }

    handle(error: Error) {
        console.error(error);
    }
}
