import { AuthGateway } from '@infra/gateways/AuthGateway.js';
import { Injectable } from '@kernel/decoratos/Injectable.js';

@Injectable(AuthGateway)
export class ForgotPasswordUseCase {
  constructor(
    private readonly authGateway: AuthGateway,
  ) { }

  async execute({
    email,
  }: ForgotPasswordUseCase.Input): Promise<ForgotPasswordUseCase.Output> {

    await this.authGateway.forgotPassword({ email });
  }
}

export namespace ForgotPasswordUseCase {
  export type Input = {
    email: string;
  };

  export type Output = void;
}
