// helpers
import { AuthRequest, ResponseBuilder } from '@halcika-micro/common';
import { HttpCode } from '@halcika-micro/errors';
import { NewOrderService } from '@service/new.service';
import { OrderDoc } from '@types';
// types
import { NextFunction, Response } from 'express';

/**
 * @export
 * @class NewOrder
 */
export class NewOrder {
  private readonly newOrderService = NewOrderService.instance;
  /**
   * Creates an instance of NewOrder.
   * @memberof NewOrder
   */
  constructor() {
    this.add = this.add.bind(this);
  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @return {Promise<void | Response>}
   * @memberof NewOrder
   */
  async add(req: AuthRequest, res: Response, next: NextFunction) {
    const userId = req.user?.id;
    try {
      const order = await this.newOrderService.add(req.body, userId as string);

      return new ResponseBuilder<OrderDoc>(res)
        .setData(order)
        .setResponseStatus(HttpCode.Created)
        .build();
    } catch (error) {
      return next(error);
    }
  }
}
