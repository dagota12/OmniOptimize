/**
 * Logger Utility
 * Centralized logging with log levels (debug, info, warn, error)
 * Only logs in debug mode to keep production console clean
 * Errors are always logged regardless of debug setting
 */

export type LogLevel = "debug" | "info" | "warn" | "error";

export interface ILogger {
  debug(message: string, data?: any): void;
  info(message: string, data?: any): void;
  warn(message: string, data?: any): void;
  error(message: string, error?: any): void;
}

export class Logger implements ILogger {
  private debugEnabled: boolean;
  private prefix: string;

  /**
   * Create a logger instance
   * @param debugEnabled - Whether debug logging is enabled (from SDK config)
   * @param prefix - Optional prefix for all log messages (e.g., "[OmniSDK]")
   */
  constructor(debugEnabled: boolean = false, prefix: string = "[OmniSDK]") {
    this.debugEnabled = debugEnabled;
    this.prefix = prefix;
  }

  /**
   * Debug level - only logged if debug is enabled
   */
  debug(message: string, data?: any): void {
    if (!this.debugEnabled) {
      return;
    }
    this.log("debug", message, data);
  }

  /**
   * Info level - only logged if debug is enabled
   */
  info(message: string, data?: any): void {
    if (!this.debugEnabled) {
      return;
    }
    this.log("info", message, data);
  }

  /**
   * Warn level - only logged if debug is enabled
   */
  warn(message: string, data?: any): void {
    if (!this.debugEnabled) {
      return;
    }
    this.log("warn", message, data);
  }

  /**
   * Error level - always logged, regardless of debug setting
   * Errors are critical and should always be visible
   */
  error(message: string, error?: any): void {
    this.log("error", message, error);
  }

  /**
   * Internal log method
   */
  private log(level: LogLevel, message: string, data?: any): void {
    const fullMessage = `${this.prefix} ${message}`;

    switch (level) {
      case "debug":
        console.log(fullMessage, data);
        break;
      case "info":
        console.info(fullMessage, data);
        break;
      case "warn":
        console.warn(fullMessage, data);
        break;
      case "error":
        if (data instanceof Error) {
          console.error(fullMessage, data.message, data.stack);
        } else {
          console.error(fullMessage, data);
        }
        break;
    }
  }

  /**
   * Update debug setting at runtime
   */
  setDebugEnabled(enabled: boolean): void {
    this.debugEnabled = enabled;
  }

  /**
   * Check if debug is enabled
   */
  isDebugEnabled(): boolean {
    return this.debugEnabled;
  }
}

/**
 * Create a no-op logger that silently ignores all logs
 * Useful for production when debug is disabled
 */
export class NoOpLogger implements ILogger {
  debug(): void {}
  info(): void {}
  warn(): void {}
  error(): void {}
}
