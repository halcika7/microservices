// helpers
import { AuthRequest, ResponseBuilder } from '@halcika-micro/common';
import { HttpCode, NotFound } from '@halcika-micro/errors';
import { OrderRepository } from '@repository/order.repository';
import { OrderDoc } from '@types';
// types
import { NextFunction, Response } from 'express';

/**
 * @export
 * @class Order
 */
export class Order {
  private readonly orderRepository = OrderRepository.instance;
  /**
   * Creates an instance of Order.
   * @memberof Order
   */
  constructor() {
    this.getOrders = this.getOrders.bind(this);
  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @return {Promise<void | Response>}
   * @memberof Order
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

      return new ResponseBuilder<OrderDoc>(res)
        .setData(order)
        .setResponseStatus(HttpCode.Ok)
        .build();
    } catch (error) {
      return next(error);
    }
  }
}
