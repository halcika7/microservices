// helpers
import { AuthRequest, ResponseBuilder } from '@halcika-micro/common';
import { HttpCode } from '@halcika-micro/errors';
import { OrderRepository } from '@repository/order.repository';
import { OrderDoc } from '@types';
// types
import { NextFunction, Response } from 'express';

/**
 * @export
 * @class Orders
 */
export class Orders {
  private readonly orderRepository = OrderRepository.instance;
  /**
   * Creates an instance of Orders.
   * @memberof Orders
   */
  constructor() {
    this.getOrders = this.getOrders.bind(this);
  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @return {Promise<void | Response>}
   * @memberof Orders
   */
  async getOrders(req: AuthRequest, res: Response, next: NextFunction) {
    const userId = req.user?.id;
    try {
      const orders = await this.orderRepository.getAllUserOrders(
        userId as string
      );

      return new ResponseBuilder<OrderDoc[]>(res)
        .setData(orders)
        .setResponseStatus(HttpCode.Ok)
        .build();
    } catch (error) {
      return next(error);
    }
  }
}
