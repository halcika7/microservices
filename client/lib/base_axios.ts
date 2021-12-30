import { IncomingMessage } from 'http';

import Axios, { HeadersDefaults } from 'axios';

const ax = Axios.create({ withCredentials: true });

export default ax;

export const buildClient = (req?: IncomingMessage) => {
  if (typeof window === 'undefined') {
    ax.defaults.baseURL =
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api';
    ax.defaults.headers = (req?.headers as unknown as HeadersDefaults) ?? {};
  } else {
    ax.defaults.baseURL = '/api';
  }

  return ax;
};
