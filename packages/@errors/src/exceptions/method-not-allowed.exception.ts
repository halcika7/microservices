import { HttpCode } from '../codes';

import { HttpException } from './http.exception';

/**
 * @export
 * @class MethodNotAllowed
 * @extends {HttpException}
 */
export class MethodNotAllowed extends HttpException {
  /**
   * Creates an instance of MethodNotAllowed.
   * @param {Record<string, unknown>} [objectOrError]
   * @memberof MethodNotAllowed
   */
  constructor(objectOrError?: Record<string, unknown>) {
    super(HttpException.createBody(objectOrError), HttpCode.MethodNotAllowed);
  }
}
