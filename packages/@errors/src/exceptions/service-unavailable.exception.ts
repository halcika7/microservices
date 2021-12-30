import { HttpCode } from '../codes';

import { HttpException } from './http.exception';

/**
 * @export
 * @class ServiceUnavailable
 * @extends {HttpException}
 */
export class ServiceUnavailable extends HttpException {
  /**
   * Creates an instance of ServiceUnavailable.
   * @param {Record<string, unknown>} [objectOrError]
   * @memberof ServiceUnavailable
   */
  constructor(objectOrError?: Record<string, unknown>) {
    super(HttpException.createBody(objectOrError), HttpCode.ServiceUnavailable);
  }
}
