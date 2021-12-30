import { HttpDescription } from '../codes';

type ErrorResponse = Record<string, unknown>;

type Description = keyof typeof HttpDescription;

/**
 * @export
 * @class HttpException
 * @extends {Error}
 */
export class HttpException extends Error {
  /**
   * @static
   * @param {Record<string, unknown>} [objectOrError]
   * @return {ErrorResponse}
   * @memberof HttpException
   */
  public static createBody(
    objectOrError?: Record<string, unknown>
  ): ErrorResponse {
    return { ...(objectOrError || {}) };
  }

  /**
   * @readonly
   * @type {string}
   * @memberof HttpException
   */
  readonly message: string;
  /**
   * @readonly
   * @type {string}
   * @memberof HttpException
   */
  readonly name: string;

  /**
   * Creates an instance of HttpException.
   *
   * @example
   * `throw new HttpException()`
   *
   * @param {ErrorResponse} response
   * @param {number} status
   * @memberof HttpException
   */
  constructor(
    private readonly response: ErrorResponse,
    private readonly status: number
  ) {
    super();
    const match = this.constructor.name.match(/[A-Z][a-z]+|[0-9]+/g);

    this.name = HttpDescription[this.constructor.name as Description];
    this.message = match ? match.join(' ') : '';
  }

  /**
   * @return {{message: string,type: string,status: number}}
   * @memberof HttpException
   */
  public getResponse() {
    return {
      message: this.message,
      type: this.name.includes('Exception')
        ? this.name
        : `${this.name} Exception`,
      status: this.status,
      ...this.response,
    };
  }
}
