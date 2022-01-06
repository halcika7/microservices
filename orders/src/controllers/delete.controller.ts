// helpers
import {
  AuthRequest,
  natsWrapper,
  OrderStatus,
  ResponseBuilder,
} from '@halcika-micro/common';
import { HttpCode, NotFound } from '@halcika-micro/errors';
import { OrderRepository } from '@repository/order.repository';
import { OrderDoc } from '@types';
// types
import { NextFunction, Response } from 'express';

import { OrderCancelledPublisher } from '../events/order-cancelled.publisher';

/**
 * @export
 * @class DeleteOrder
 */
export class DeleteOrder {
  private readonly orderRepository = OrderRepository.instance;
  private readonly orderCancelledPublisher: OrderCancelledPublisher;
  /**
   * Creates an instance of DeleteOrder.
   * @memberof DeleteOrder
   */
  constructor() {
    this.orderCancelledPublisher = new OrderCancelledPublisher(
      natsWrapper.client
    );
    this.getOrders = this.getOrders.bind(this);
  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @return {Promise<void | Response>}
   * @memberof DeleteOrder
   */
  async getOrders(req: AuthRequest, res: Response, next: NextFunction) {
    const userId = req.user?.id;
    try {
      const order = await this.orderRepository.getUserOrder(
        userId as string,
        req.params.id
      );

      if (!order) {
        throw new NotFound({ message: 'Order does not exist' });
      }

      order.status = OrderStatus.Cancelled;

      await order.save();

      await this.orderCancelledPublisher.publish({
        id: order.id,
        version: order.version,
        ticket: {
          id: order.ticket.id,
        },
      });

      return new ResponseBuilder<OrderDoc>(res)
        .setData(order)
        .setResponseStatus(HttpCode.Ok)
        .build();
    } catch (error) {
      return next(error);
    }
  }
}
