
import { Injectable } from '@kernel/decoratos/Injectable.js';
import { env } from './env.js';

@Injectable()
export class AppConfig {
  readonly auth: AppConfig.Auth;

  constructor() {
    this.auth = {
      cognito: {
        clientId: env.COGNITO_CLIENT_ID,
      },
    };
  }
}

export namespace AppConfig {
  export type Auth = {
    cognito: {
      clientId: string;
    }
  };
}
