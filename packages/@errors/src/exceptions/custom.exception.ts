import { HttpException } from './http.exception';

/**
 * @export
 * @class CustomException
 * @extends {HttpException}
 */
export class CustomException extends HttpException {
  /**
   * Creates an instance of CustomException.
   * @param {Record<string, unknown>} objectOrError
   * @param {number} statusCode
   * @memberof CustomException
   */
  constructor(objectOrError: Record<string, unknown>, statusCode: number) {
    super(HttpException.createBody(objectOrError), statusCode);
  }
}
