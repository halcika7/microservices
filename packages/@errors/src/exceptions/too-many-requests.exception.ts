import { HttpCode } from '../codes';

import { HttpException } from './http.exception';

/**
 * @export
 * @class TooManyRequests
 * @extends {HttpException}
 */
export class TooManyRequests extends HttpException {
  /**
   * Creates an instance of TooManyRequests.
   * @param {Record<string, unknown>} [objectOrError]
   * @memberof TooManyRequests
   */
  constructor(objectOrError?: Record<string, unknown>) {
    super(HttpException.createBody(objectOrError), HttpCode.TooManyRequests);
  }
}
