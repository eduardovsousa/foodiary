import { AuthGateway } from '@infra/gateways/AuthGateway.js';
import { Injectable } from '@kernel/decoratos/Injectable.js';

@Injectable(AuthGateway)
export class SignUpUseCase {
  constructor(private readonly authGateway: AuthGateway) { }

  async execute({
    email,
    password,
  }: SignUpUseCase.Input): Promise<SignUpUseCase.Output> {
    await this.authGateway.signUp({ email, password });

    const { accessToken, refreshToken } = await this.authGateway.signIn({ email, password });

    return {
      accessToken,
      refreshToken,
    };
  }
}

export namespace SignUpUseCase {
  export type Input = {
    email: string;
    password: string;
  };

  export type Output = {
    accessToken: string;
    refreshToken: string;
  };
}
