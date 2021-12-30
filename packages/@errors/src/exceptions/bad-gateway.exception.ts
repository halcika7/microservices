import { HttpCode } from '../codes';

import { HttpException } from './http.exception';

/**
 * @export
 * @class BadGateway
 * @extends {HttpException}
 */
export class BadGateway extends HttpException {
  /**
   * Creates an instance of BadGateway.
   * @example
   * `throw new BadGateway()`
   *
   * @param {Record<string, unknown>} [objectOrError]
   * @memberof BadGateway
   */
  constructor(objectOrError?: Record<string, unknown>) {
    super(HttpException.createBody(objectOrError), HttpCode.BadGateway);
  }
}
