import { GetTicket } from '@controller/ticket.controller';
import { isAuthenticated } from '@halcika-micro/common';
import { Router } from 'express';

/**
 * @export
 * @class GetTicketRoute
 */
export class GetTicketRoute {
  /**
   * @private
   * @type {Router}
   * @memberof GetTicketRoute
   */
  private readonly router = Router();
  /**
   * @private
   * @type {Refresh}
   * @memberof GetTicketRoute
   */
  private readonly ticket: GetTicket;

  /**
   * Creates an instance of GetTicketRoute.
   * @memberof GetTicketRoute
   */
  constructor() {
    this.ticket = new GetTicket();
  }

  /**
   * @readonly
   * @type {Router}
   * @memberof RefreshRoute
   */
  get routes() {
    this.router.get('/:id', isAuthenticated(), this.ticket.getTicket);

    return this.router;
  }
}
