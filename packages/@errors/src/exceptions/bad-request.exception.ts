import { HttpCode } from '../codes';

import { HttpException } from './http.exception';

/**
 * @export
 * @class BadRequest
 * @extends {HttpException}
 */
export class BadRequest extends HttpException {
  /**
   * Instantiate a `BadRequest` .
   * @example
   * `throw new BadRequest()`
   *
   * The HTTP response status code will be 400.
   *
   * @param objectOrError object describing the error condition.
   */
  constructor(objectOrError?: Record<string, unknown>) {
    super(HttpException.createBody(objectOrError), HttpCode.BadRequest);
  }
}
