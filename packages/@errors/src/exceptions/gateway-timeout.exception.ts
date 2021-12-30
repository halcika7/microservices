import { HttpCode } from '../codes';

import { HttpException } from './http.exception';

/**
 * @export
 * @class GatewayTimeout
 * @extends {HttpException}
 */
export class GatewayTimeout extends HttpException {
  /**
   * Creates an instance of GatewayTimeout.
   * @param {Record<string, unknown>} [objectOrError]
   * @memberof GatewayTimeout
   */
  constructor(objectOrError?: Record<string, unknown>) {
    super(HttpException.createBody(objectOrError), HttpCode.GatewayTimeout);
  }
}
