import { Types } from 'mongoose';
import { HttpCode } from '@halcika-micro/errors';

import { getCookies } from '../__mocks__/tokens';
import { request } from '../__mocks__';

let cookies: string[];

export const newTicket = () => {
  beforeEach(() => {
    cookies = getCookies();
  });

  describe('Testing POST ticket route', () => {
    it('has a route handler listening to /api/tickets for post requests', async () => {
      const id = new Types.ObjectId().toHexString();
      const rsp = await request
        .put({ url: `tickets/v1/${id}` })
        .set('cookie', cookies[0])
        .set('cookie', cookies[1])
        .send({
          title: 'title',
          price: 300,
        });

      expect(rsp.status).not.toEqual(HttpCode.NotFound);
    });

    it('can only be accessed if the user is signed in', () => {
      return request
        .put({ url: 'tickets/v1' })
        .send({})
        .expect(HttpCode.Unauthorized);
    });
  });
};
