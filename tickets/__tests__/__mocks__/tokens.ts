import { Types } from 'mongoose';
import { JWT } from '@halcika-micro/common';

const jwt = JWT.instance;

const id = new Types.ObjectId().toHexString();

export const getCookies = () => {
  const token = {
    email: 'test@test.com',
    firstName: '',
    lastName: '',
    roles: [],
    id,
  };
  const access = jwt.signToken(token);
  const refresh = jwt.signToken(token, true);

  return [
    `cookieRefreshName=${refresh}; Path=/; HttpOnly=true; SameSite=Strict`,
    `accessToken=${access}; Path=/; HttpOnly=true; SameSite=Strict`,
  ];
};
