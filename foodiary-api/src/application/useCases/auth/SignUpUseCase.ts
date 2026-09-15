import { Account } from '@application/entities/Account.js';
import { Goal } from '@application/entities/Goal.js';
import { Profile } from '@application/entities/Profile.js';
import { EmailAlreadyInUse } from '@application/errors/application/EmailAlreadyInUse.js';
import { AccountRepository } from '@infra/database/dynamo/repositories/AccountRepository.js';
import { GoalRepository } from '@infra/database/dynamo/repositories/GoalRepository.js';
import { ProfileRepository } from '@infra/database/dynamo/repositories/ProfileRepository.js';
import { AuthGateway } from '@infra/gateways/AuthGateway.js';
import { Injectable } from '@kernel/decoratos/Injectable.js';

@Injectable(AuthGateway, AccountRepository, ProfileRepository, GoalRepository)
export class SignUpUseCase {
  constructor(
    private readonly authGateway: AuthGateway,
    private readonly accountRepository: AccountRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly goalRepository: GoalRepository,
  ) { }

  async execute({
    account: {
      email,
      password,
    },
    profile: profileInfo,
  }: SignUpUseCase.Input): Promise<SignUpUseCase.Output> {
    const emailAlreadyInUse = await this.accountRepository.findByEmail(email);

    if (emailAlreadyInUse) {
      throw new EmailAlreadyInUse();
    }

    const account = new Account({ email });
    const profile = new Profile({
      ...profileInfo,
      accountId: account.id,
    });
    const goal = new Goal({
      accountId: account.id,
      calories: 2500,
      proteins: 180,
      fats: 80,
      carbohydrates: 500,
    });

    const { externalId } = await this.authGateway.signUp({
      email,
      password,
      internalId: account.id,
    });

    account.externalId = externalId;

    await Promise.all([
      await this.accountRepository.create(account),
      await this.profileRepository.create(profile),
      await this.goalRepository.create(goal),
    ]);

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
