import { Document } from 'mongoose';

export * from './env';

/**
 * @export
 * @interface TicketDoc
 * @extends {Document}
 */
export interface TicketDoc extends Document {
  /**
   * @type {string}
   * @memberof TicketDoc
   */
  id: string;
  /**
   * @type {string}
   * @memberof TicketDoc
   */
  title: string;
  /**
   * @type {number}
   * @memberof TicketDoc
   */
  price: number;
  /**
   * @type {string}
   * @memberof TicketDoc
   */
  userId: string;
  /**
   * @type {string}
   * @memberof TicketDoc
   */
  orderId?: string;
  /**
   * @type {number}
   * @memberof TicketDoc
   */
  version: number;
}

/**
 * @export
 * @interface AddTicket
 */
export interface AddTicket {
  /**
   * @type {string}
   * @memberof AddTicket
   */
  title: string;
  /**
   * @type {number}
   * @memberof AddTicket
   */
  price: number;
  /**
   * @type {string}
   * @memberof TicketDoc
   */
  userId: string;
}
