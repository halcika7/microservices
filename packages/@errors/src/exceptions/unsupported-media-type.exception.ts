import { HttpCode } from '../codes';

import { HttpException } from './http.exception';

/**
 * @export
 * @class UnsupportedMediaType
 * @extends {HttpException}
 */
export class UnsupportedMediaType extends HttpException {
  /**
   * Creates an instance of UnsupportedMediaType.
   * @param {Record<string, unknown>} [objectOrError]
   * @memberof UnsupportedMediaType
   */
  constructor(objectOrError?: Record<string, unknown>) {
    super(
      HttpException.createBody(objectOrError),
      HttpCode.UnsupportedMediaType
    );
  }
}
