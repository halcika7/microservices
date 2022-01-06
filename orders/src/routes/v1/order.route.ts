import { isAuthenticated, validateWithThrow } from '@halcika-micro/common';
import { Router } from 'express';
import { param } from 'express-validator';
import { Types } from 'mongoose';

/**
 * @export
 * @class OrderRoute
 */
export class OrderRoute {
  /**
   * @private
   * @type {Router}
   * @memberof OrderRoute
   */
  private readonly router = Router();
  /**
   * @private
   * @type {Refresh}
   * @memberof OrderRoute
   */
  //   private readonly ticket: NewTicket;

  /**
   * Creates an instance of OrderRoute.
   * @memberof OrderRoute
   */
  constructor() {
    // this.ticket = new NewTicket();
  }

  /**
   * @readonly
   * @type {Router}
   * @memberof OrderRoute
   */
  get routes() {
    this.router.get(
      '/:id',
      isAuthenticated(),
      validateWithThrow([
        param('id')
          .not()
          .isEmpty()
          .custom((value: string) => Types.ObjectId.isValid(value))
          .withMessage('TicketId must be provided'),
      ])
      //   this.ticket.add
    );

    return this.router;
  }
}
