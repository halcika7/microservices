import { Logger } from './logger';

/**
 * @export
 * @class LoggerFactory
 */
export class LoggerFactory {
  /**
   * @private
   * @static
   * @type {Map<string, Logger>}
   * @memberof LoggerFactory
   */
  private static readonly loggerMap: Map<string, Logger> = new Map<
    string,
    Logger
  >();

  /**
   * @static
   * @param {string} Class
   * @param {('development' | 'test' | 'staging' | 'production')} environment
   * @return {Logger}
   * @memberof LoggerFactory
   */
  static getLogger(
    Class: string,
    environment: 'development' | 'test' | 'staging' | 'production'
  ) {
    if (!LoggerFactory.loggerMap.has(Class)) {
      LoggerFactory.loggerMap.set(Class, new Logger(Class, environment));
    }

    return LoggerFactory.loggerMap.get(Class) as Logger;
  }

  /**
   * Creates an instance of LoggerFactory.
   * @memberof LoggerFactory
   */
  private constructor() {}
}
