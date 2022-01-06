import { Router } from 'express';

import { NewTicketRoute } from './new-ticket.route';
import { GetTicketRoute } from './ticket.route';
import { GetTicketsRoute } from './tickets.route';

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
      new NewTicketRoute().routes,
      new GetTicketsRoute().routes,
      new GetTicketRoute().routes,
    ]);

    return this.router;
  }
}
