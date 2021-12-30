// helpers
import { ResponseBuilder } from '@packages/common-backend';
import { BadRequest, HttpCode } from '@packages/errors';
// types
import { NextFunction, Request, Response } from 'express';
import { env } from '@types';
// services
import { RefreshService } from '@service/refresh.service';
import { LoggerFactory } from '@packages/logger';

/**
 * @export
 * @class Refresh
 */
export class Refresh {
  /**
   * @private
   * @memberof Refresh
   */
  private readonly refreshService = RefreshService.instance;

  private readonly logger = LoggerFactory.getLogger(
    'Refresh Controller',
    env.env
  );

  /**
   * Creates an instance of Refresh.
   * @memberof Refresh
   */
  constructor() {
    this.refresh = this.refresh.bind(this);
  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @return {Promise<void | Response>}
   * @memberof Refresh
   */
  async refresh(req: Request, res: Response, next: NextFunction) {
    const isFirstCheck = req.query.firstCheck === 'true';
    try {
      const token = await this.refreshService.refresh(res, req);

      return new ResponseBuilder<string>(res)
        .setData(token)
        .setResponseStatus(HttpCode.Ok)
        .build();
    } catch (error) {
      this.logger.error(
        error,
        '🚀 ~ file: refresh.controller.ts ~ line 46 ~ Refresh ~ refresh ~ error'
      );
      if (isFirstCheck) return next(new BadRequest());
      return next(error);
    }
  }
}
