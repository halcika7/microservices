import { HttpCode } from '../codes';

import { HttpException } from './http.exception';

/**
 * @export
 * @class RequestTimeout
 * @extends {HttpException}
 */
export class RequestTimeout extends HttpException {
  /**
   * Creates an instance of RequestTimeout.
   * @param {Record<string, unknown>} [objectOrError]
   * @memberof RequestTimeout
   */
  constructor(objectOrError?: Record<string, unknown>) {
    super(HttpException.createBody(objectOrError), HttpCode.RequestTimeout);
  }
}
