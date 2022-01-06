import { Orders } from '@controller/orders.controller';
import { isAuthenticated } from '@halcika-micro/common';
import { Router } from 'express';

/**
 * @export
 * @class OrdersRoute
 */
export class OrdersRoute {
  /**
   * @private
   * @type {Router}
   * @memberof OrdersRoute
   */
  private readonly router = Router();
  /**
   * @private
   * @type {Refresh}
   * @memberof NewOrderRoute
   */
  private readonly order: Orders;

  /**
   * Creates an instance of OrdersRoute.
   * @memberof OrdersRoute
   */
  constructor() {
    this.order = new Orders();
  }

  /**
   * @readonly
   * @type {Router}
   * @memberof OrdersRoute
   */
  get routes() {
    this.router.get('/', isAuthenticated(), this.order.getOrders);

    return this.router;
  }
}
