import { Router } from 'express';

import { NewOrderRoute } from './new.route';
import { DeleteOrderRoute } from './delete.route';
import { OrderRoute } from './order.route';
import { OrdersRoute } from './orders.route';

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
      new NewOrderRoute().routes,
      new DeleteOrderRoute().routes,
      new OrdersRoute().routes,
      new OrderRoute().routes,
    ]);

    return this.router;
  }
}
