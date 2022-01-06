import { Server as HttpServer } from 'http';

import supertest from 'supertest';
import { Server } from '@halcika-micro/common';
import mongo from 'mongoose';

import { Routes } from '../../src/routes';

const { routes } = Routes;

export const app = new Server(3000, routes);

class HttpRequest {
  private static instance: HttpRequest;

  public static getInstance(): HttpRequest {
    if (!HttpRequest.instance) {
      HttpRequest.instance = new HttpRequest();
    }

    return HttpRequest.instance;
  }

  private app?: HttpServer;

  private requestWithSupertest?: supertest.SuperAgentTest;

  private constructor() {
    this.app = new Server(3000, routes).start(() =>
      mongo.connect(
        'mongodb+srv://halc:riIxagouHYTNri9S@print-shop.la9iv.mongodb.net/auth'
      )
    );
    this.requestWithSupertest = supertest.agent(this.app);
  }

  close() {
    this.app?.close();
    this.app = undefined;
    this.requestWithSupertest = undefined;
  }

  getRequest() {
    return {
      post: this.hook('post'),
      get: this.hook('get'),
      put: this.hook('put'),
      patch: this.hook('patch'),
      delete: this.hook('delete'),
    };
  }

  private hook(method: 'post' | 'get' | 'put' | 'patch' | 'delete') {
    return (args: { url: string; token?: string }) =>
      // eslint-disable-next-line security/detect-object-injection
      this.requestWithSupertest?.[method](`/api/${args.url}`).set(
        'Authorization',
        args.token || ''
      ) as supertest.Test;
  }
}

export const instance = HttpRequest.getInstance();
