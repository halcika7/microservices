import { HttpCode } from '../codes';

import { HttpException } from './http.exception';

/**
 * @export
 * @class Unauthorized
 * @extends {HttpException}
 */
export class Unauthorized extends HttpException {
  /**
   * Creates an instance of Unauthorized.
   * @param {Record<string, unknown>} [objectOrError]
   * @memberof Unauthorized
   */
  constructor(objectOrError?: Record<string, unknown>) {
    super(HttpException.createBody(objectOrError), HttpCode.Unauthorized);
  }
}
