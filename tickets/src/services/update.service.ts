// repositories
import { TicketRepository } from '@repository/ticket.repository';
// types
import { AddTicket } from '@types';
// helpers
import { natsWrapper } from '@halcika-micro/common';
import { BadRequest, NotFound } from '@halcika-micro/errors';

import { TicketUpdatedPublisher } from '../events/ticket-upated.publisher';

/**
 * @export
 * @class UpdateTicketService
 */
export class UpdateTicketService {
  /**
   * @private
   * @static
   * @type {UpdateTicketService}
   * @memberof UpdateTicketService
   */
  private static Instance: UpdateTicketService;
  /**
   * @private
   * @type {TicketRepository}
   * @memberof UpdateTicketService
   */
  private readonly ticketRepository = TicketRepository.instance;

  private readonly ticketUpdatedPublisher: TicketUpdatedPublisher;

  /**
   * Creates an instance of UpdateTicketService.
   * @memberof UpdateTicketService
   */
  private constructor() {
    this.ticketUpdatedPublisher = new TicketUpdatedPublisher(
      natsWrapper.client
    );
  }

  /**
   * @readonly
   * @static
   * @type {UpdateTicketService}
   * @memberof UpdateTicketService
   */
  static get instance() {
    if (!this.Instance) {
      this.Instance = new UpdateTicketService();
    }
    return this.Instance;
  }

  /**
   * @param {string} userId
   * @param {string} ticketId
   * @param {AddTicket} data
   * @memberof UpdateTicketService
   */
  async update(userId: string, ticketId: string, data: AddTicket) {
    const ticket = await this.ticketRepository.getUserTicket(userId, ticketId);

    if (!ticket) {
      throw new NotFound({ message: 'Ticket not found' });
    }

    if (ticket.orderId) {
      throw new BadRequest({ message: 'Can not edit a reserved ticket' });
    }

    await ticket.set({ title: data.title, price: data.price }).save();

    await this.ticketUpdatedPublisher.publish({
      id: ticket.id,
      price: ticket.price,
      version: ticket.version,
      title: ticket.title,
      userId: ticket.userId,
    });

    return ticket;
  }
}
