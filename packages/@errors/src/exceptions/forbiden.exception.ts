import { HttpCode } from '../codes';

import { HttpException } from './http.exception';

/**
 * @export
 * @class Forbidden
 * @extends {HttpException}
 */
export class Forbidden extends HttpException {
  /**
   * Creates an instance of Forbidden.
   * @param {Record<string, unknown>} [objectOrError]
   * @memberof Forbidden
   */
  constructor(objectOrError?: Record<string, unknown>) {
    super(HttpException.createBody(objectOrError), HttpCode.Forbidden);
  }
}
