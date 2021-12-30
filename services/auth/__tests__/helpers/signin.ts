import request from 'supertest';

import server from '../../src';

export const signInHelper = async () => {
  const rsp = await request(server)
    .post('/api/users/v1/sign-in')
    .send({
      email: 'test@test.com',
      password: '@Volimtejaa7',
    })
    .expect(200);
  return rsp.headers['set-cookie'][0];
};
