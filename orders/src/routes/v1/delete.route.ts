import { isAuthenticated } from '@halcika-micro/common';
import { Router } from 'express';

/**
 * @export
 * @class DeleteOrderRoute
 */
export class DeleteOrderRoute {
  /**
   * @private
   * @type {Router}
   * @memberof DeleteOrderRoute
   */
  private readonly router = Router();
  /**
   * @private
   * @type {Refresh}
   * @memberof DeleteOrderRoute
   */
  //   private readonly ticket: NewTicket;

  /**
   * Creates an instance of DeleteOrderRoute.
   * @memberof DeleteOrderRoute
   */
  constructor() {
    // this.ticket = new NewTicket();
  }

  /**
   * @readonly
   * @type {Router}
   * @memberof DeleteOrderRoute
   */
  get routes() {
    this.router.delete(
      '/:id',
      isAuthenticated()
      //   this.ticket.add
    );

    return this.router;
  }
}
