import { HttpCode } from '../codes';

import { HttpException } from './http.exception';

/**
 * @export
 * @class HttpVersionNotSupported
 * @extends {HttpException}
 */
export class HttpVersionNotSupported extends HttpException {
  /**
   * Creates an instance of HttpVersionNotSupported.
   * @param {Record<string, unknown>} [objectOrError]
   * @memberof HttpVersionNotSupported
   */
  constructor(objectOrError?: Record<string, unknown>) {
    super(
      HttpException.createBody(objectOrError),
      HttpCode.HttpVersionNotSupported
    );
  }
}
