import { HttpCode } from '../codes';

import { HttpException } from './http.exception';

/**
 * @export
 * @class InternalServerError
 * @extends {HttpException}
 */
export class InternalServerError extends HttpException {
  /**
   * Creates an instance of InternalServerError.
   * @param {Record<string, unknown>} [objectOrError]
   * @memberof InternalServerError
   */
  constructor(objectOrError?: Record<string, unknown>) {
    super(
      HttpException.createBody(objectOrError),
      HttpCode.InternalServerError
    );
  }
}
