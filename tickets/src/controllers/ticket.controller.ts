// helpers
import { AuthRequest, ResponseBuilder } from '@halcika-micro/common';
import { HttpCode, NotFound } from '@halcika-micro/errors';
import { TicketRepository } from '@repository/ticket.repository';
import { AddTicket } from '@types';
// types
import { NextFunction, Response } from 'express';

/**
 * @export
 * @class GetTicket
 */
export class GetTicket {
  private readonly ticketRepository = TicketRepository.instance;
  /**
   * Creates an instance of GetTicket.
   * @memberof GetTicket
   */
  constructor() {
    this.getTicket = this.getTicket.bind(this);
  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @return {Promise<void | Response>}
   * @memberof GetTicket
   */
  async getTicket(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const ticket = await this.ticketRepository.getById(req.params.id);

      if (!ticket) {
        throw new NotFound({ message: 'Ticket not found' });
      }

      return new ResponseBuilder<AddTicket>(res)
        .setData(ticket)
        .setResponseStatus(HttpCode.Ok)
        .build();
    } catch (error) {
      return next(error);
    }
  }
}
