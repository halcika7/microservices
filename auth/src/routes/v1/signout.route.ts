import { SignOut } from '@controller/signout.controller';
import { Router } from 'express';

/**
 * @export
 * @class SignOutRoute
 */
export class SignOutRoute {
  /**
   * @private
   * @type {Router}
   * @memberof SignOutRoute
   */
  private readonly router = Router();
  /**
   * @private
   * @type {SignOut}
   * @memberof SignOutRoute
   */
  private readonly signOut: SignOut;

  /**
   * Creates an instance of SignOutRoute.
   * @memberof SignOutRoute
   */
  constructor() {
    this.signOut = new SignOut();
  }

  /**
   * @readonly
   * @type {Router}
   * @memberof SignOutRoute
   */
  get routes() {
    this.router.post('/sign-out', this.signOut.signOut);

    return this.router;
  }
}
