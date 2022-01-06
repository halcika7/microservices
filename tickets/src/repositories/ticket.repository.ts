// helpers
import { BaseRepository } from '@halcika-micro/common';
// types
import { AddTicket, TicketDoc } from '@types';
// models
import { Ticket } from '@model/ticket.model';

/**
 * @export
 * @class TicketRepository
 * @extends {BaseRepository<TicketDoc>}
 */
export class TicketRepository extends BaseRepository<TicketDoc> {
  /**
   * @private
   * @static
   * @type {TicketRepository}
   * @memberof TicketRepository
   */
  private static Instance: TicketRepository;

  /**
   * Creates an instance of TicketRepository.
   * @memberof TicketRepository
   */
  private constructor() {
    super(Ticket);
  }

  /**
   * @readonly
   * @static
   * @memberof TicketRepository
   */
  static get instance() {
    if (!this.Instance) {
      this.Instance = new TicketRepository();
    }
    return this.Instance;
  }

  /**
   * @param {AddTicket} data
   * @return {Promise<TicketDoc>}
   * @memberof TicketRepository
   */
  createTicket(data: AddTicket) {
    return super.create<AddTicket>(data).save();
  }

  /**
   * @param {string} id
   * @return {Promise<TicketDoc | undefined>}
   * @memberof TicketRepository
   */
  getById(id: string) {
    return super.byId(id);
  }

  /**
   * @param {string} id
   * @return {Promise<TicketDoc[]>}
   * @memberof TicketRepository
   */
  getAll(userId: string) {
    return super.model.find({ userId });
  }

  /**
   * @param {string} userId
   * @param {string} id
   * @return {Promise<TicketDoc|null>}
   * @memberof TicketRepository
   */
  getUserTicket(userId: string, _id: string) {
    return super.model.findOne({ userId, _id });
  }
}
