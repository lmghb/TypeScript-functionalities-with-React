declare type Action<T> = (...item: T[]) => void;
export declare class Logger {
    static Log(message: string): void;
    static LogDirectlyInConsole(message: string): Action<number>;
    static LogUsingLoggerLog(message: string): Action<void>;
    static LogUsingLogSomeMessage(): Action<void>;
    private static LogSomeMessage;
}
export {};
