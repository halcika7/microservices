import { Document } from 'mongoose';

export * from './env';

/**
 * @export
 * @interface UserDoc
 * @extends {Document}
 */
export interface UserDoc extends Document {
  /**
   * @type {string}
   * @memberof UserDoc
   */
  id: string;
  /**
   * @type {string}
   * @memberof UserDoc
   */
  email: string;
  /**
   * @type {string}
   * @memberof UserDoc
   */
  password: string;
}

/**
 * @export
 * @interface AddUser
 */
export interface AddUser {
  /**
   * @type {string}
   * @memberof AddUser
   */
  email: string;
  /**
   * @type {string}
   * @memberof AddUser
   */
  password: string;
}
