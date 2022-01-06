import { OrderStatus } from '@halcika-micro/common';
import { OrderDoc } from '@types';
import { model, Schema } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

const schema = new Schema(
  {
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Created,
    },
    ticket: { type: Schema.Types.ObjectId, ref: 'Ticket' },
    expiresAt: { type: Schema.Types.Date },
    userId: { type: String, required: true },
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

export const Order = model<OrderDoc>('Order', schema);
