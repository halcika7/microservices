import { HttpCode } from '../codes';

import { HttpException } from './http.exception';

/**
 * @export
 * @class NotFound
 * @extends {HttpException}
 */
export class NotFound extends HttpException {
  /**
   * Creates an instance of NotFound.
   * @param {Record<string, unknown>} [objectOrError]
   * @memberof NotFound
   */
  constructor(objectOrError?: Record<string, unknown>) {
    super(HttpException.createBody(objectOrError), HttpCode.NotFound);
  }
}
