import os from 'os';

import winston, { Logger as Winston } from 'winston';
import { HttpException } from '@packages/errors';

winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'purple',
});

/**
 * @enum {string}
 */
enum LogLevel {
  Debug = 'debug',
  Info = 'info',
  Warn = 'warn',
  Error = 'error',
}

/**
 * @interface LogError
 */
interface LogError {
  /**
   * @type {unknown}
   * @memberof LogError
   */
  msg?: unknown;
  /**
   * @type {unknown}
   * @memberof LogError
   */
  stack?: unknown;
  /**
   * @type {unknown}
   * @memberof LogError
   */
  name?: unknown;
  /**
   * @type {Record<string, unknown>}
   * @memberof LogError
   */
  response?: Record<string, unknown>;
}

/**
 * @interface Log
 */
interface Log {
  /**
   * @type {string}
   * @memberof Log
   */
  app: string;
  /**
   * @type {string}
   * @memberof Log
   */
  hostName: string;
  /**
   * @type {string}
   * @memberof Log
   */
  event: string;
  /**
   * @type {string}
   * @memberof Log
   */
  timestamp: string;
  /**
   * @type {string}
   * @memberof Log
   */
  class: string;
  /**
   * @type {string}
   * @memberof Log
   */
  method: string;
  /**
   * @type {LogError}
   * @memberof Log
   */
  error?: LogError;
}

type LoggerError = Error | HttpException | string | unknown;

const baseOptions = [
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
];

const format = winston.format.combine(...baseOptions, winston.format.json());

/**
 * @export
 * @class Logger
 */
export class Logger {
  /**
   * @private
   * @type {Winston}
   * @memberof Logger
   */
  private readonly winstonLogger: Winston;

  /**
   * @private
   * @type {Log}
   * @memberof Logger
   */
  private logConfig: Log = {
    app: 'micro-services',
    timestamp: new Date().toISOString(),
    hostName: os.hostname(),
    class: this.Class,
    method: '',
    event: '',
  };

  /**
   * Creates an instance of Logger.
   * @param {string} Class
   * @param {('development' | 'test' | 'staging' | 'production')} environment
   * @memberof Logger
   */
  constructor(
    private Class: string,
    environment: 'development' | 'test' | 'staging' | 'production'
  ) {
    this.Class = Class;
    this.winstonLogger = winston.createLogger({
      level: 'debug',
      format: winston.format.json(),
      transports: [
        new winston.transports.File({ filename: 'logs/app.log', format }),
        new winston.transports.File({
          level: LogLevel.Error,
          filename: 'logs/error.log',
          format,
        }),
      ],
    });

    if (environment === 'development' || environment) {
      this.winstonLogger.add(
        new winston.transports.Console({
          format: winston.format.combine(
            ...baseOptions,
            winston.format.prettyPrint({ colorize: true })
          ),
        })
      );
    }
  }

  /**
   * @param {string} msg
   * @param {string} method
   * @memberof Logger
   */
  info(msg: string, method: string) {
    this.logEvent(LogLevel.Info, this.formatMessage(msg, method));
  }

  /**
   * @param {string} msg
   * @param {string} method
   * @memberof Logger
   */
  debug(msg: string, method: string) {
    this.logEvent(LogLevel.Debug, this.formatMessage(msg, method));
  }

  /**
   * @param {string} msg
   * @param {string} method
   * @memberof Logger
   */
  warning(msg: string, method: string) {
    this.logEvent(LogLevel.Warn, this.formatMessage(msg, method));
  }

  /**
   * @param {LoggerError} err
   * @param {string} method
   * @memberof Logger
   */
  error(err: LoggerError, method: string) {
    this.logEvent(LogLevel.Error, this.formatErrorMessage(err, method));
  }

  /**
   * @private
   * @param {string} event
   * @param {string} method
   * @return {Log}
   * @memberof Logger
   */
  private formatMessage(event: string, method: string): Log {
    return { ...this.logConfig, method, event };
  }

  /**
   * @private
   * @param {LoggerError} err
   * @param {string} method
   * @return {Log}
   * @memberof Logger
   */
  private formatErrorMessage(err: LoggerError, method: string) {
    const log: Log = {
      ...this.logConfig,
      method,
      event: 'Error',
      error: {} as LogError,
    };

    if (err instanceof HttpException) {
      log.error = {
        name: err.name,
        stack: err.stack,
        response: err.getResponse(),
      };
    } else if (err instanceof Error) {
      log.error = { name: err.name, msg: err.message, stack: err.stack };
    } else {
      log.error = { name: err, msg: err, stack: new Error().stack };
    }

    return log;
  }

  /**
   * @private
   * @param {LogLevel} level
   * @param {Log} event
   * @memberof Logger
   */
  private logEvent(level: LogLevel, event: Log) {
    this.winstonLogger.log(level, event);
  }
}
