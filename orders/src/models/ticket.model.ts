import { OrderRepository } from '@repository/order.repository';
import { TicketDoc } from '@types';
import { model, Schema } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

const schema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
  },
  {
    toJSON: {
      transform(_, ret) {
        const obj = Object.entries(ret).map(val => {
          if (val[0] === '_id') return ['id', val[1]];
          return val;
        });
        return Object.fromEntries(obj);
      },
      versionKey: false,
    },
  }
);

schema.set('versionKey', 'version');
schema.plugin(updateIfCurrentPlugin);

schema.statics.isReserved = async function isReserved() {
  const order = await OrderRepository.instance.findIfReserved(this);
  return Boolean(order);
};

export const Ticket = model<TicketDoc>('Ticket', schema);
