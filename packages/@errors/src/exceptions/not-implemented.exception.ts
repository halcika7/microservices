import { HttpCode } from '../codes';

import { HttpException } from './http.exception';

/**
 * @export
 * @class NotImplemented
 * @extends {HttpException}
 */
export class NotImplemented extends HttpException {
  /**
   * Creates an instance of NotImplemented.
   * @param {Record<string, unknown>} [objectOrError]
   * @memberof NotImplemented
   */
  constructor(objectOrError?: Record<string, unknown>) {
    super(HttpException.createBody(objectOrError), HttpCode.NotImplemented);
  }
}
