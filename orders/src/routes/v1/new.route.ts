import { NewOrder } from '@controller/new.controller';
import { isAuthenticated, validateWithThrow } from '@halcika-micro/common';
import { Router } from 'express';
import { body } from 'express-validator';
import { Types } from 'mongoose';

/**
 * @export
 * @class NewOrderRoute
 */
export class NewOrderRoute {
  /**
   * @private
   * @type {Router}
   * @memberof NewOrderRoute
   */
  private readonly router = Router();
  /**
   * @private
   * @type {Refresh}
   * @memberof NewOrderRoute
   */
  private readonly order: NewOrder;

  /**
   * Creates an instance of NewOrderRoute.
   * @memberof NewOrderRoute
   */
  constructor() {
    this.order = new NewOrder();
  }

  /**
   * @readonly
   * @type {Router}
   * @memberof RefreshRoute
   */
  get routes() {
    this.router.post(
      '/',
      isAuthenticated(),
      validateWithThrow([
        body('ticketId')
          .not()
          .isEmpty()
          .custom((value: string) => Types.ObjectId.isValid(value))
          .withMessage('TicketId must be provided'),
        body('price')
          .isFloat({ gt: 0 })
          .withMessage('Price must be greater than 0'),
      ]),
      this.order.add
    );

    return this.router;
  }
}
