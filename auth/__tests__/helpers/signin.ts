import { request } from '../__mocks__';

export const signInHelper = async () => {
  const rsp = await request
    .post({ url: '/users/v1/sign-in' })
    .send({
      email: 'test@test.com',
      password: '@Volimtejaa7',
    })
    .expect(200);
  return rsp.headers['set-cookie'].map((cookie: string) =>
    cookie.replace('HttpOnly', 'HttpOnly=true')
  );
};
