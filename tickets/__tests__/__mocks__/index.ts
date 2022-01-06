import { instance } from './util';

export const request = instance.getRequest();

export const cleanup = () => instance.close();
