import { HttpCode } from '../codes';

import { HttpException } from './http.exception';

/**
 * @export
 * @class RequestUriTooLong
 * @extends {HttpException}
 */
export class RequestUriTooLong extends HttpException {
  /**
   * Creates an instance of RequestUriTooLong.
   * @param {Record<string, unknown>} [objectOrError]
   * @memberof RequestUriTooLong
   */
  constructor(objectOrError?: Record<string, unknown>) {
    super(HttpException.createBody(objectOrError), HttpCode.RequestUriTooLong);
  }
}
