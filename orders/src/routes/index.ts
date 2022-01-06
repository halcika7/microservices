import { Router } from 'express';

// routes
import { V1Routes } from './v1';

/**
 * @export
 * @class Routes
 */
export class Routes {
  /**
   * Creates an instance of Routes.
   * @memberof Routes
   */
  private constructor() {}

  /**
   * @readonly
   * @static
   * @type {Router}
   * @memberof Routes
   */
  static get routes() {
    const router: Router = Router();
    router.use('/orders', new V1Routes().routes);

    return router;
  }
}
