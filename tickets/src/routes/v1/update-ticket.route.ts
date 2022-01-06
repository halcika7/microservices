import { UpdateTicket } from '@controller/update.controller';
import { isAuthenticated, validateWithThrow } from '@halcika-micro/common';
import { Router } from 'express';
import { body } from 'express-validator';

/**
 * @export
 * @class UpdateTicketRoute
 */
export class UpdateTicketRoute {
  /**
   * @private
   * @type {Router}
   * @memberof UpdateTicketRoute
   */
  private readonly router = Router();
  /**
   * @private
   * @type {Refresh}
   * @memberof UpdateTicketRoute
   */
  private readonly update: UpdateTicket;

  /**
   * Creates an instance of UpdateTicketRoute.
   * @memberof UpdateTicketRoute
   */
  constructor() {
    this.update = new UpdateTicket();
  }

  /**
   * @readonly
   * @type {Router}
   * @memberof RefreshRoute
   */
  get routes() {
    this.router.put(
      '/:id',
      isAuthenticated(),
      validateWithThrow([
        body('title').not().isEmpty().withMessage('Title is required'),
        body('price')
          .isFloat({ gt: 0 })
          .withMessage('Price must be greater than 0'),
      ]),
      this.update.update
    );

    return this.router;
  }
}
