import { Request } from 'express';

/**
 * @export
 * @interface Token
 */
export interface Token {
  /**
   * @type {string}
   * @memberof Token
   */
  id: string;
  /**
   * @type {string}
   * @memberof Token
   */
  firstName: string;
  /**
   * @type {string}
   * @memberof Token
   */
  lastName: string;
  /**
   * @type {string}
   * @memberof Token
   */
  email: string;
  /**
   * @type {string[]}
   * @memberof Token
   */
  roles: string[];
}

/**
 * @export
 * @interface AuthRequest
 * @extends {Request}
 */
export interface AuthRequest extends Request {
  /**
   * @type {Token}
   * @memberof AuthRequest
   */
  user?: Token;
}
