// helpers
import { AuthRequest, ResponseBuilder } from '@halcika-micro/common';
import { HttpCode } from '@halcika-micro/errors';
import { TicketRepository } from '@repository/ticket.repository';
import { AddTicket } from '@types';
// types
import { NextFunction, Response } from 'express';

/**
 * @export
 * @class GetTickets
 */
export class GetTickets {
  private readonly ticketRepository = TicketRepository.instance;
  /**
   * Creates an instance of GetTickets.
   * @memberof GetTickets
   */
  constructor() {
    this.getTickets = this.getTickets.bind(this);
  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @return {Promise<void | Response>}
   * @memberof GetTickets
   */
  async getTickets(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const tickets = await this.ticketRepository.getAll(
        req.user?.id as string
      );

      return new ResponseBuilder<AddTicket[]>(res)
        .setData(tickets)
        .setResponseStatus(HttpCode.Ok)
        .build();
    } catch (error) {
      return next(error);
    }
  }
}
