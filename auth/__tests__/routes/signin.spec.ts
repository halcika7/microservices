import { request } from '../__mocks__';

export const signin = () => {
  describe('Testing sign in route', () => {
    it('should sign in user', () => {
      return request
        .post({ url: 'users/v1/sign-in' })
        .send({
          email: 'test@test.com',
          password: '@Volimtejaa7',
        })
        .expect(200);
    });

    it('should not sign in user', () => {
      return request
        .post({ url: 'users/v1/sign-in' })
        .send({
          email: 'test@test.com',
          password: '@',
        })
        .expect(400);
    });

    it('should not sign in user', () => {
      return request
        .post({ url: 'users/v1/sign-in' })
        .send({
          email: 'test@gmail.com',
          password: '@',
        })
        .expect(400);
    });
  });
};
