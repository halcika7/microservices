// helpers
import { BaseRepository, OrderStatus } from '@halcika-micro/common';
// types
import { CreateOrder, OrderDoc, TicketDoc } from '@types';
// models
import { Order } from '@model/order.model';
import { Model } from 'mongoose';

/**
 * @export
 * @class OrderRepository
 * @extends {BaseRepository<TicketDoc>}
 */
export class OrderRepository extends BaseRepository<OrderDoc> {
  /**
   * @private
   * @static
   * @type {OrderRepository}
   * @memberof OrderRepository
   */
  private static Instance: OrderRepository;

  /**
   * Creates an instance of OrderRepository.
   * @memberof OrderRepository
   */
  private constructor() {
    super(Order);
  }

  /**
   * @readonly
   * @static
   * @memberof OrderRepository
   */
  static get instance() {
    if (!this.Instance) {
      this.Instance = new OrderRepository();
    }
    return this.Instance;
  }

  /**
   * @param {CreateOrder} data
   * @return {Promise<OrderDoc>}
   * @memberof OrderRepository
   */
  createOrder(data: CreateOrder) {
    return super.create<CreateOrder>(data).save();
  }

  /**
   * @param {string} id
   * @return {Promise<OrderDoc | undefined>}
   * @memberof OrderRepository
   */
  getById(id: string) {
    return super.byId(id);
  }

  findIfReserved(ticket: TicketDoc | Model<TicketDoc>) {
    return super.model.findOne({
      ticket,
      status: { $nin: [OrderStatus.Cancelled] },
    });
  }

  getAllUserOrders(userId: string) {
    return super.model.find({ userId }).populate('ticket');
  }

  getUserOrder(userId: string, _id: string) {
    return super.model.findOne({ userId, _id }).populate('ticket');
  }
}
