import { OrderStatus } from '@halcika-micro/common';
import { Document } from 'mongoose';

export * from './env';

/**
 * @export
 * @interface OrderDoc
 * @extends {Document}
 */
export interface OrderDoc extends Document {
  /**
   * @type {string}
   * @memberof OrderDoc
   */
  id: string;
  /**
   * @type {OrderStatus}
   * @memberof OrderDoc
   */
  status: OrderStatus;
  /**
   * @type {Date}
   * @memberof OrderDoc
   */
  expiresAt: Date;
  /**
   * @type {string}
   * @memberof OrderDoc
   */
  userId: string;
  /**
   * @type {TicketDoc}
   * @memberof OrderDoc
   */
  ticket: TicketDoc;
  /**
   * @type {number}
   * @memberof OrderDoc
   */
  version: number;
}

export interface CreateOrder {
  /**
   * @type {OrderStatus}
   * @memberof CreateOrder
   */
  status: OrderStatus;
  /**
   * @type {Date}
   * @memberof CreateOrder
   */
  expiresAt: Date;
  /**
   * @type {string}
   * @memberof CreateOrder
   */
  userId: string;
  /**
   * @type {TicketDoc}
   * @memberof CreateOrder
   */
  ticket: TicketDoc;
}

/**
 * @export
 * @interface AddOrder
 */
export interface AddOrder {
  /**
   * @type {string}
   * @memberof AddOrder
   */
  ticketId: string;
}

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
  isReserved(): Promise<boolean>;
  /**
   * @type {number}
   * @memberof OrderDoc
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
   * @memberof TicketDoc
   */
  _id: string;
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
}
