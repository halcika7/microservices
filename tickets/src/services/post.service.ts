// repositories
import { TicketRepository } from '@repository/ticket.repository';
// types
import { AddTicket } from '@types';
// helpers
import { natsWrapper } from '@halcika-micro/common';

import { TicketCreatedPublisher } from '../events/ticket-created.publisher';

/**
 * @export
 * @class NewTicketService
 */
export class NewTicketService {
  /**
   * @private
   * @static
   * @type {NewTicketService}
   * @memberof NewTicketService
   */
  private static Instance: NewTicketService;
  /**
   * @private
   * @type {TicketRepository}
   * @memberof NewTicketService
   */
  private readonly ticketRepository = TicketRepository.instance;

  private readonly ticketCreatedPublisher: TicketCreatedPublisher;

  /**
   * Creates an instance of NewTicketService.
   * @memberof NewTicketService
   */
  private constructor() {
    this.ticketCreatedPublisher = new TicketCreatedPublisher(
      natsWrapper.client
    );
  }

  /**
   * @readonly
   * @static
   * @type {NewTicketService}
   * @memberof NewTicketService
   */
  static get instance() {
    if (!this.Instance) {
      this.Instance = new NewTicketService();
    }
    return this.Instance;
  }

  /**
   * @param {AddTicket} data
   * @return {Promise<string>}
   * @memberof SignInService
   */
  async add(data: AddTicket) {
    const ticket = await this.ticketRepository.createTicket(data);

    await this.ticketCreatedPublisher.publish({
      id: ticket.id,
      price: ticket.price,
      version: ticket.version,
      title: ticket.title,
      userId: ticket.userId,
    });

    return ticket;
  }
}
