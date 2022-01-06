import { TicketDoc } from '@types';
import { model, Schema } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

const schema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    userId: { type: String, required: true },
    orderId: { type: String },
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

export const Ticket = model<TicketDoc>('Ticket', schema);
