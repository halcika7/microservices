import { request } from '../__mocks__';

export const signout = () => {
  describe('Testing sign out route', () => {
    it('should sign out user', () => {
      return request.post({ url: 'users/v1/sign-out' }).expect(200);
    });
  });
};
