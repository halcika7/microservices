import { createContext } from 'react';

import { DecodedToken } from '../lib/decode';

type UserType = DecodedToken | Record<string, unknown>;
interface IContext {
  user: UserType;
  setUser: (val: DecodedToken) => void;
}

export const AuthContext = createContext({} as IContext);
