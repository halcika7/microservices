import { HttpCode } from '../codes';

import { HttpException } from './http.exception';

/**
 * @export
 * @class PayloadTooLarge
 * @extends {HttpException}
 */
export class PayloadTooLarge extends HttpException {
  /**
   * Creates an instance of PayloadTooLarge.
   * @param {Record<string, unknown>} [objectOrError]
   * @memberof PayloadTooLarge
   */
  constructor(objectOrError?: Record<string, unknown>) {
    super(HttpException.createBody(objectOrError), HttpCode.RequestTooLong);
  }
}
