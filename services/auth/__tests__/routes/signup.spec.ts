import request from 'supertest';

import server from '../../src';

export const signup = () => {
  it('should create a new user', () => {
    return request(server)
      .post('/api/users/v1/sign-up')
      .send({
        email: 'test@test.com',
        password: '@Volimtejaa7',
      })
      .expect(201);
  });

  it('should not create same user', () => {
    return request(server)
      .post('/api/users/v1/sign-up')
      .send({
        email: 'test@test.com',
        password: '@Volimtejaa7',
      })
      .expect(400);
  });

  it('should not create a new user', () => {
    return request(server)
      .post('/api/users/v1/sign-up')
      .send({
        email: 'test@test.com',
        password: '@',
      })
      .expect(400);
  });

  afterAll(() => {
    server.close();
  });
};
