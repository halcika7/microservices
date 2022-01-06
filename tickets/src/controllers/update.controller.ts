// helpers
import { AuthRequest, ResponseBuilder } from '@halcika-micro/common';
import { HttpCode } from '@halcika-micro/errors';
import { UpdateTicketService } from '@service/update.service';
import { AddTicket } from '@types';
// types
import { NextFunction, Response } from 'express';

/**
 * @export
 * @class UpdateTicket
 */
export class UpdateTicket {
  private readonly updateTicketService = UpdateTicketService.instance;
  /**
   * Creates an instance of UpdateTicket.
   * @memberof UpdateTicket
   */
  constructor() {
    this.update = this.update.bind(this);
  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @return {Promise<void | Response>}
   * @memberof UpdateTicket
   */
  async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const ticket = await this.updateTicketService.update(
        req.user?.id as string,
        req.params.id,
        req.body
      );

      return new ResponseBuilder<AddTicket>(res)
        .setData(ticket)
        .setResponseStatus(HttpCode.Ok)
        .build();
    } catch (error) {
      return next(error);
    }
  }
}
