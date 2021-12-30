import { Refresh } from '@controller/refresh.controller';
import { Router } from 'express';

/**
 * @export
 * @class RefreshRoute
 */
export class RefreshRoute {
  /**
   * @private
   * @type {Router}
   * @memberof RefreshRoute
   */
  private readonly router = Router();
  /**
   * @private
   * @type {Refresh}
   * @memberof RefreshRoute
   */
  private readonly refresh: Refresh;

  /**
   * Creates an instance of RefreshRoute.
   * @memberof RefreshRoute
   */
  constructor() {
    this.refresh = new Refresh();
  }

  /**
   * @readonly
   * @type {Router}
   * @memberof RefreshRoute
   */
  get routes() {
    this.router.get('/refresh', this.refresh.refresh);

    return this.router;
  }
}
