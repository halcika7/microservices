import { Router } from 'express';

import { RefreshRoute } from './refresh.route';
import { SignInRoute } from './signin.route';
import { SignOutRoute } from './signout.route';
import { SignUpRoute } from './signup.route';

/**
 * @export
 * @class V1Routes
 */
export class V1Routes {
  /**
   * @private
   * @type {Router}
   * @memberof V1Routes
   */
  private readonly router = Router();

  /**
   * @readonly
   * @type {Router}
   * @memberof V1Routes
   */
  get routes() {
    this.router.use('/v1', [
      new RefreshRoute().routes,
      new SignInRoute().routes,
      new SignUpRoute().routes,
      new SignOutRoute().routes,
    ]);

    return this.router;
  }
}
