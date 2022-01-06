// helpers
import { ResponseBuilder } from '@halcika-micro/common';
import { BadRequest, HttpCode } from '@halcika-micro/errors';
// types
import { NextFunction, Request, Response } from 'express';
// services
import { RefreshService } from '@service/refresh.service';

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
      if (isFirstCheck) return next(new BadRequest());
      return next(error);
    }
  }
}
