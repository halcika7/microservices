import { request } from '../__mocks__';
import { signInHelper } from '../helpers/signin';

export const refresh = () => {
  describe('Testing refresh route', () => {
    it('should not refresh token', () => {
      return request
        .get({ url: 'users/v1/refresh' })
        .query({
          firstCheck: true,
        })
        .expect(400);
    });

    it('should not refresh token not first check', () => {
      return request.get({ url: 'users/v1/refresh' }).expect(401);
    });

    it('should refresh token', async () => {
      const token = await signInHelper();
      return request
        .get({ url: 'users/v1/refresh' })
        .set('cookie', token[0])
        .set('cookie', token[1])
        .query({
          firstCheck: true,
        })
        .expect(200);
    });
  });
};
