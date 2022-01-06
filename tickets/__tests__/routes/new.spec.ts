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
      const rsp = await request.post({ url: 'tickets/v1' }).send({});

      expect(rsp.status).not.toEqual(HttpCode.NotFound);
    });

    it('can only be accessed if the user is signed in', () => {
      return request
        .post({ url: 'tickets/v1' })
        .send({})
        .expect(HttpCode.Unauthorized);
    });

    it('returns an error if an invalid title is provided', async () => {
      await request
        .post({ url: 'tickets/v1' })
        .send({ title: '', price: '123' })
        .set('cookie', cookies[0])
        .set('cookie', cookies[1])
        .expect(HttpCode.BadRequest);

      await request
        .post({ url: 'tickets/v1' })
        .send({ price: '123' })
        .set('cookie', cookies[0])
        .set('cookie', cookies[1])
        .expect(HttpCode.BadRequest);
    });

    it('returns an error if an invalid price is provided', async () => {
      await request
        .post({ url: 'tickets/v1' })
        .send({ title: 'odijaosijdo', price: -10 })
        .set('cookie', cookies[0])
        .set('cookie', cookies[1])
        .expect(HttpCode.BadRequest);

      await request
        .post({ url: 'tickets/v1' })
        .send({ title: '123' })
        .set('cookie', cookies[0])
        .set('cookie', cookies[1])
        .expect(HttpCode.BadRequest);
    });

    it('creates a ticket with valid inputs', async () => {
      const rsp = await request
        .post({ url: 'tickets/v1' })
        .send({
          title: 'title',
          price: 123,
        })
        .set('cookie', cookies[0])
        .set('cookie', cookies[1])
        .expect(HttpCode.Created);

      expect(rsp.body.result.price).toEqual(123);
    });
  });
};
