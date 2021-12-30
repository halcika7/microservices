import { HttpCode } from '../codes';

import { HttpException } from './http.exception';

/**
 * @export
 * @class NotAcceptable
 * @extends {HttpException}
 */
export class NotAcceptable extends HttpException {
  /**
   * Creates an instance of NotAcceptable.
   * @param {Record<string, unknown>} [objectOrError]
   * @memberof NotAcceptable
   */
  constructor(objectOrError?: Record<string, unknown>) {
    super(HttpException.createBody(objectOrError), HttpCode.NotAcceptable);
  }
}
