import mongoose from 'mongoose';

import { cleanup } from '../__mocks__';

import { refresh } from './refresh.spec';
import { signup } from './signup.spec';
import { signout } from './sign-out.spec';
import { signin } from './signin.spec';

describe('Testing routes', () => {
  afterAll(async () => {
    cleanup();
    await mongoose.connection.dropCollection('users');
    await mongoose.connection.close();
  });

  signup();
  signin();
  signout();
  refresh();
});
