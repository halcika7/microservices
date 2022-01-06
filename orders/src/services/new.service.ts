// repositories
import { natsWrapper, OrderStatus } from '@halcika-micro/common';
import { BadRequest, NotFound } from '@halcika-micro/errors';
import { OrderRepository } from '@repository/order.repository';
import { TicketRepository } from '@repository/ticket.repository';
// types
import { AddOrder } from '@types';

import { OrderCreatedPublisher } from '../events/order-created.publisher';

/**
 * @export
 * @class NewOrderService
 */
export class NewOrderService {
  /**
   * @private
   * @static
   * @type {NewOrderService}
   * @memberof NewOrderService
   */
  private static Instance: NewOrderService;
  /**
   * @private
   * @type {TicketRepository}
   * @memberof NewOrderService
   */
  private readonly ticketRepository = TicketRepository.instance;
  /**
   * @private
   * @type {OrderRepository}
   * @memberof NewOrderService
   */
  private readonly orderRepository = OrderRepository.instance;

  private readonly orderCreatedPublisher: OrderCreatedPublisher;

  /**
   * Creates an instance of NewOrderService.
   * @memberof NewOrderService
   */
  private constructor() {
    this.orderCreatedPublisher = new OrderCreatedPublisher(natsWrapper.client);
  }

  /**
   * @readonly
   * @static
   * @type {NewOrderService}
   * @memberof NewOrderService
   */
  static get instance() {
    if (!this.Instance) {
      this.Instance = new NewOrderService();
    }
    return this.Instance;
  }

  /**
   * @param {AddTicket} data
   * @return {Promise<string>}
   * @memberof SignInService
   */
  async add(data: AddOrder, userId: string) {
    const ticket = await this.ticketRepository.getById(data.ticketId);

    if (!ticket) {
      throw new NotFound({ message: 'Ticket does not exist' });
    }

    const isReserved = await ticket.isReserved();

    if (isReserved) {
      throw new BadRequest({ message: 'Ticket is already reserved' });
    }

    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + 15 * 60);

    const order = await this.orderRepository.createOrder({
      expiresAt,
      status: OrderStatus.Created,
      ticket,
      userId,
    });

    await this.orderCreatedPublisher.publish({
      id: order.id,
      version: order.version,
      status: order.status,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(),
      ticket: {
        id: ticket.id,
        price: ticket.price,
      },
    });

    return order;
  }
}
