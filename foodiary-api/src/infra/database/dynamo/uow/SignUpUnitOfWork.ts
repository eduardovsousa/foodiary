import { Account } from '@application/entities/Account.js';
import { Goal } from '@application/entities/Goal.js';
import { Profile } from '@application/entities/Profile.js';
import { Injectable } from '@kernel/decorators/Injectable.js';
import { AccountRepository } from '../repositories/AccountRepository.js';
import { GoalRepository } from '../repositories/GoalRepository.js';
import { ProfileRepository } from '../repositories/ProfileRepository.js';
import { UnitOfWork } from './UnitOfWork.js';

@Injectable()
export class SignUpUnitOfWork extends UnitOfWork {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly goalRepository: GoalRepository,
  ) {
    super();
  }

  async run({ account, goal, profile }: SignUpUnitOfWork.RunParams) {
    this.addPut(this.accountRepository.getPutCommandInput(account));
    this.addPut(this.profileRepository.getPutCommandInput(profile));
    this.addPut(this.goalRepository.getPutCommandInput(goal));

    await this.commit();
  }
}

export namespace SignUpUnitOfWork {
  export type RunParams = {
    account: Account,
    goal: Goal,
    profile: Profile
  }
}
