import { model, Schema } from 'mongoose';
import { Hash } from '@lib/hash';
import { UserDoc } from '@types';

const schema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    toJSON: {
      transform(_, ret) {
        const obj = Object.entries(ret)
          .filter(vals => vals[0] !== 'password')
          .map(val => {
            if (val[0] === '_id') return ['id', val[1]];
            return val;
          });
        return Object.fromEntries(obj);
      },
      versionKey: false,
    },
  }
);

schema.pre('save', async function fn(done) {
  if (this.isModified('password')) {
    const hash = await Hash.hash(this.get('password'));
    this.set('password', hash);
  }
  done();
});

export const User = model<UserDoc>('User', schema);
