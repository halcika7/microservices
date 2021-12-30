import request from 'supertest';

import server from '../../src';

export const signIn = () => {
  it('should sign in user', () => {
    return request(server)
      .post('/api/users/v1/sign-in')
      .send({
        email: 'test@test.com',
        password: '@Volimtejaa7',
      })
      .expect(200);
  });

  it('should not sign in user', () => {
    return request(server)
      .post('/api/users/v1/sign-in')
      .send({
        email: 'test@test.com',
        password: '@',
      })
      .expect(400);
  });

  it('should not sign in user', () => {
    return request(server)
      .post('/api/users/v1/sign-in')
      .send({
        email: 'test@gmail.com',
        password: '@',
      })
      .expect(400);
  });

  afterAll(() => {
    server.close();
  });
};
