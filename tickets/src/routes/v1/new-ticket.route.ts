import { NewTicket } from '@controller/post.controller';
import { isAuthenticated, validateWithThrow } from '@halcika-micro/common';
import { Router } from 'express';
import { body } from 'express-validator';

/**
 * @export
 * @class NewTicketRoute
 */
export class NewTicketRoute {
  /**
   * @private
   * @type {Router}
   * @memberof NewTicketRoute
   */
  private readonly router = Router();
  /**
   * @private
   * @type {Refresh}
   * @memberof NewTicketRoute
   */
  private readonly ticket: NewTicket;

  /**
   * Creates an instance of NewTicketRoute.
   * @memberof NewTicketRoute
   */
  constructor() {
    this.ticket = new NewTicket();
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
        body('title').not().isEmpty().withMessage('Title is required'),
        body('price')
          .isFloat({ gt: 0 })
          .withMessage('Price must be greater than 0'),
      ]),
      this.ticket.add
    );

    return this.router;
  }
}
