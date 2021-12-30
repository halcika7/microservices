import { HttpCode } from '../codes';

import { HttpException } from './http.exception';

/**
 * @export
 * @class ImATeapot
 * @extends {HttpException}
 */
export class ImATeapot extends HttpException {
  /**
   * Creates an instance of ImATeapot.
   * @param {Record<string, unknown>} [objectOrError]
   * @memberof ImATeapot
   */
  constructor(objectOrError?: Record<string, unknown>) {
    super(HttpException.createBody(objectOrError), HttpCode.ImATeapot);
  }
}
