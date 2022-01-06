import { HttpCode } from '@halcika-micro/errors';

import { getCookies } from '../__mocks__/tokens';
import { request } from '../__mocks__';

let cookies: string[];

export const getTickets = () => {
  beforeEach(() => {
    cookies = getCookies();
  });

  describe('Testing GET tickets route', () => {
    it('returns 401 if not authorized', () => {
      return request.get({ url: 'tickets/v1' }).expect(HttpCode.Unauthorized);
    });

    it('returns tickets for assigned user', async () => {
      const rsp = await request
        .get({ url: `tickets/v1` })
        .set('cookie', cookies[0])
        .set('cookie', cookies[1])
        .expect(HttpCode.Ok);

      expect(rsp.body.result.length).toEqual(2);
    });
  });
};
