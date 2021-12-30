import request from 'supertest';

import { signInHelper } from '../helpers/signin';
import server from '../../src';

export const refresh = () => {
  it('should not refresh token', () => {
    return request(server)
      .post('/api/users/v1/refresh')
      .query({
        firstCheck: true,
      })
      .expect(400);
  });

  it('should not refresh token not first check', () => {
    return request(server).post('/api/users/v1/refresh').expect(401);
  });

  it('should refresh token', async () => {
    const token = await signInHelper();
    return request(server)
      .post('/api/users/v1/refresh')
      .set('Cookie', [token])
      .query({
        firstCheck: true,
      })
      .expect(200);
  });

  afterAll(() => {
    server.close();
  });
};
