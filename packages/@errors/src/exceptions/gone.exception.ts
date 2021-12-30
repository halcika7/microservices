import { HttpCode } from '../codes';

import { HttpException } from './http.exception';

/**
 * @export
 * @class Gone
 * @extends {HttpException}
 */
export class Gone extends HttpException {
  /**
   * Creates an instance of Gone.
   * @param {Record<string, unknown>} [objectOrError]
   * @memberof Gone
   */
  constructor(objectOrError?: Record<string, unknown>) {
    super(HttpException.createBody(objectOrError), HttpCode.Gone);
  }
}
