import { Account } from '@application/entities/Account.js';
import { Profile } from '@application/entities/Profile.js';
import { EmailAlreadyInUse } from '@application/errors/application/EmailAlreadyInUse.js';
import { AccountRepository } from '@infra/database/dynamo/repositories/AccountRepository.js';
import { AuthGateway } from '@infra/gateways/AuthGateway.js';
import { Injectable } from '@kernel/decoratos/Injectable.js';

@Injectable(AuthGateway, AccountRepository)
export class SignUpUseCase {
  constructor(
    private readonly authGateway: AuthGateway,
    private readonly accountRepository: AccountRepository,
  ) { }

  async execute({
    account: {
      email,
      password,
    },
    profile,
  }: SignUpUseCase.Input): Promise<SignUpUseCase.Output> {
    const emailAlreadyInUse = await this.accountRepository.findByEmail(email);

    if (emailAlreadyInUse) {
      throw new EmailAlreadyInUse();
    }

    const account = new Account({ email });
    const { externalId } = await this.authGateway.signUp({
      email,
      password,
      internalId: account.id,
    });

    account.externalId = externalId;

    await this.accountRepository.create(account);

    const { accessToken, refreshToken } = await this.authGateway.signIn({ email, password });

    return {
      accessToken,
      refreshToken,
    };
  }
}

export namespace SignUpUseCase {
  export type Input = {
    account: {
      email: string;
      password: string;
    };
    profile: {
      name: string;
      birthDate: Date;
      gender: Profile.Gender;
      height: number;
      weight: number;
      activityLevel: Profile.ActivityLevel;
    }
  };

  export type Output = {
    accessToken: string;
    refreshToken: string;
  };
}
