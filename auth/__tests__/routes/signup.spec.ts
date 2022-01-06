import { request } from '../__mocks__';

export const signup = () => {
  describe('Testing signup route', () => {
    it('should create a new user', () => {
      return request
        .post({ url: 'users/v1/sign-up' })
        .send({
          email: 'test@test.com',
          password: '@Volimtejaa7',
        })
        .expect(201);
    });

    it('should not create same user', () => {
      return request
        .post({ url: 'users/v1/sign-up' })
        .send({
          email: 'test@test.com',
          password: '@Volimtejaa7',
        })
        .expect(400);
    });

    it('should not create a new user', () => {
      return request
        .post({ url: 'users/v1/sign-up' })
        .send({
          email: 'test@test.com',
          password: '@',
        })
        .expect(400);
    });
  });
};
