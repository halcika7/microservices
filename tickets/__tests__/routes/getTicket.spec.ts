import { HttpCode } from '@halcika-micro/errors';
import { Types } from 'mongoose';

import { getCookies } from '../__mocks__/tokens';
import { request } from '../__mocks__';

let cookies: string[];

export const getTicket = () => {
  beforeEach(() => {
    cookies = getCookies();
  });

  describe('Testing GET ticket route', () => {
    it('returns 401 if not authorized', () => {
      return request
        .get({ url: 'tickets/v1/idjisdjoiasodj' })
        .expect(HttpCode.Unauthorized);
    });

    it('returns 404 if ticket is not found', async () => {
      const id = new Types.ObjectId().toHexString();
      return request
        .get({ url: `tickets/v1/${id}` })
        .set('cookie', cookies[0])
        .set('cookie', cookies[1])
        .expect(HttpCode.NotFound);
    });

    it('returns 500 for invalid id', async () => {
      return request
        .get({ url: `tickets/v1/ijdoiajsdioasjod` })
        .set('cookie', cookies[0])
        .set('cookie', cookies[1])
        .expect(HttpCode.InternalServerError);
    });

    it('returns the ticket if the ticket is found', async () => {
      const data = {
        title: 'title1',
        price: 123,
      };
      const rsp = await request
        .post({ url: 'tickets/v1' })
        .set('cookie', cookies[0])
        .set('cookie', cookies[1])
        .send(data)
        .expect(HttpCode.Created);

      expect(rsp.body.result.title).toEqual(data.title);
      expect(rsp.body.result.price).toEqual(data.price);

      return request
        .get({ url: `tickets/v1/${rsp.body.result.id}` })
        .set('cookie', cookies[0])
        .set('cookie', cookies[1])
        .expect(HttpCode.Ok);
    });
  });
};
