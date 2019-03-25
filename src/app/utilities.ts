
// export type Action = () => void;
type Action<T> = (...item: T[]) => void;

export class Logger {

  public static Log(message: string): void {
    console.log(message);
  }

  public static LogDirectlyInConsole(message: string): Action<number> {
    return () => console.log(`LogDirectlyInConsole: console.log - ${message}`);
  }

  public static LogUsingLoggerLog(message: string): Action<void> {
    return () => Logger.Log(`LogUsingLoggerLog: Logger.Log - ${message}`);
  }

  public static LogUsingLogSomeMessage(): Action<void> {
    return Logger.LogSomeMessage;
  }

  private static LogSomeMessage(): void {
    Logger.Log('LogSomeMessage: logging some private message');
  }
}
