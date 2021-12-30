import { HttpCode } from '../codes';

import { HttpException } from './http.exception';

/**
 * @export
 * @class Conflict
 * @extends {HttpException}
 */
export class Conflict extends HttpException {
  /**
   * Creates an instance of Conflict.
   * @example
   * `throw new Conflict()`
   *
   * @param {Record<string, unknown>} [objectOrError]
   * @memberof Conflict
   */
  constructor(objectOrError?: Record<string, unknown>) {
    super(HttpException.createBody(objectOrError), HttpCode.Conflict);
  }
}
