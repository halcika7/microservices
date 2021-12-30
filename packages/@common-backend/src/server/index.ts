import express, { urlencoded, json, Application, Router } from 'express';
import compression from 'compression';
import cookieparser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import { morganMiddleware } from '@packages/logger';

import { errorHandle } from '../middleware/error-handle';

/**
 * @export
 * @class Server
 */
export class Server {
  /**
   * @private
   * @type {Application}
   * @memberof Server
   */
  private readonly app: Application;
  /**
   * @private
   * @type {number}
   * @memberof Server
   */
  private readonly port: number;
  /**
   * @private
   * @type {Router[]}
   * @memberof Server
   */
  private readonly routes: Router[];

  /**
   * Creates an instance of Server.
   * @param {number} port
   * @param {...Router[]} routes
   * @memberof Server
   */
  constructor(port: number, ...routes: Router[]) {
    this.app = express();
    this.port = port;
    this.routes = routes;
    this.setAppMiddlewares();
  }

  /**
   * @param {Function} [cb]
   * @return {Server}
   * @memberof Server
   */
  public start(cb?: () => void) {
    this.app.use('/api', this.routes);

    this.app.use(errorHandle);

    return this.app.listen(this.port, cb);
  }

  /**
   * @private
   * @memberof Server
   */
  private setAppMiddlewares() {
    this.app.set('trust proxy', true);

    const middlewares = [
      cors(),
      morganMiddleware,
      hpp(),
      helmet(),
      compression(),
      json({ limit: '50mb' }),
      urlencoded({ extended: false, limit: '1kb', parameterLimit: 10 }),
      cookieparser(),
    ];

    this.app.use(middlewares);
  }
}
