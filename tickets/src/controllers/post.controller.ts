// helpers
import { AuthRequest, ResponseBuilder } from '@halcika-micro/common';
import { HttpCode } from '@halcika-micro/errors';
import { NewTicketService } from '@service/post.service';
import { AddTicket } from '@types';
// types
import { NextFunction, Response } from 'express';

/**
 * @export
 * @class NewTicket
 */
export class NewTicket {
  private readonly newTicketService = NewTicketService.instance;
  /**
   * Creates an instance of NewTicket.
   * @memberof NewTicket
   */
  constructor() {
    this.add = this.add.bind(this);
  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @return {Promise<void | Response>}
   * @memberof NewTicket
   */
  async add(req: AuthRequest, res: Response, next: NextFunction) {
    const userId = req.user?.id;
    try {
      const ticket = await this.newTicketService.add({
        ...req.body,
        userId,
      });

      return new ResponseBuilder<AddTicket>(res)
        .setData(ticket)
        .setResponseStatus(HttpCode.Created)
        .build();
    } catch (error) {
      console.log(
        '🚀 ~ file: post.controller.ts ~ line 43 ~ NewTicket ~ add ~ error',
        error
      );
      return next(error);
    }
  }
}
