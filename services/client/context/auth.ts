import { createContext } from 'react';

import { DecodedToken } from '../lib/decode';

export const AuthContext = createContext(
  {} as DecodedToken | Record<string, unknown>
);
