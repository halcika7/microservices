import { GetTickets } from '@controller/tickets.controller';
import { isAuthenticated } from '@halcika-micro/common';
import { Router } from 'express';

/**
 * @export
 * @class GetTicketsRoute
 */
export class GetTicketsRoute {
  /**
   * @private
   * @type {Router}
   * @memberof GetTicketsRoute
   */
  private readonly router = Router();
  /**
   * @private
   * @type {Refresh}
   * @memberof GetTicketsRoute
   */
  private readonly ticket: GetTickets;

  /**
   * Creates an instance of GetTicketsRoute.
   * @memberof GetTicketsRoute
   */
  constructor() {
    this.ticket = new GetTickets();
  }

  /**
   * @readonly
   * @type {Router}
   * @memberof RefreshRoute
   */
  get routes() {
    this.router.get('/', isAuthenticated(), this.ticket.getTickets);

    return this.router;
  }
}
