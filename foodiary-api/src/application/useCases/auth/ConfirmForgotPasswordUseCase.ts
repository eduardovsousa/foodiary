import { AuthGateway } from '@infra/gateways/AuthGateway.js';
import { Injectable } from '@kernel/decorators/Injectable.js';

@Injectable()
export class ConfirmForgotPasswordUseCase {
  constructor(
    private readonly authGateway: AuthGateway,
  ) { }

  async execute({
    email,
    confirmationCode,
    password,
  }: ConfirmForgotPasswordUseCase.Input): Promise<ConfirmForgotPasswordUseCase.Output> {

    await this.authGateway.confirmForgotPassword({
      email,
      confirmationCode,
      password,
    });
  }
}

export namespace ConfirmForgotPasswordUseCase {
  export type Input = {
    email: string;
    confirmationCode: string;
    password: string;
  };

  export type Output = void;
}
