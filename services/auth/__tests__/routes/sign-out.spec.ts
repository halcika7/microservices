import request from 'supertest';

import server from '../../src';

export const signOut = () => {
  it('should sign out user', () => {
    return request(server).post('/api/users/v1/sign-out').expect(200);
  });

  afterAll(() => {
    server.close();
  });
};
