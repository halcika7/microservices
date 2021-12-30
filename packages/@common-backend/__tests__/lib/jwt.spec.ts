import { Unauthorized } from '@packages/errors';

import { JWT } from '../../src';

const user = {
  id: 'ajsoijidjoas',
  firstName: '',
  lastName: '',
  email: '',
  roles: [],
};

describe('Test JWT class', () => {
  it('Should create access token', () => {
    const jwt = JWT.instance;
    const token = jwt.signToken(user);

    expect(token).toBeTruthy();
  });

  it('Should decode token', () => {
    const jwt = JWT.instance;
    const token = jwt.signToken(user);
    const decoded = jwt.decodeToken(token);

    expect(decoded).toHaveProperty('email');
  });

  it('Should verify token', () => {
    const jwt = JWT.instance;
    const token = jwt.signToken(user);
    const verify = jwt.verifyToken(token);

    expect(verify).toHaveProperty('email');
  });

  it('Should throw an error when verify token', () => {
    let customErr;
    try {
      JWT.instance.verifyToken('token');
    } catch (error) {
      customErr = error;
    }
    expect(customErr).toBeInstanceOf(Unauthorized);
  });

  it('Should create refresh token', () => {
    const jwt = JWT.instance;
    const token = jwt.signToken(user, true);

    expect(token).toBeTruthy();
  });
});
