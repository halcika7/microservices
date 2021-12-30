import { HttpCode } from '../codes';

import { HttpException } from './http.exception';

/**
 * @export
 * @class UnprocessableEntity
 * @extends {HttpException}
 */
export class UnprocessableEntity extends HttpException {
  /**
   * Creates an instance of UnprocessableEntity.
   * @param {Record<string, unknown>} [objectOrError]
   * @memberof UnprocessableEntity
   */
  constructor(objectOrError?: Record<string, unknown>) {
    super(
      HttpException.createBody(objectOrError),
      HttpCode.UnprocessableEntity
    );
  }
}
