import { Profile } from '@application/entities/Profile.js';
import { ResourceNotFound } from '@application/errors/application/ResourceNotFound.js';
import { ProfileRepository } from '@infra/database/dynamo/repositories/ProfileRepository.js';
import { Injectable } from '@kernel/decorators/Injectable.js';

@Injectable()
export class UpdateProfileUseCase {
  constructor(private readonly profileRepository: ProfileRepository) { }

  async execute({
    accountId,
    birthDate,
    gender,
    height,
    name,
    weight,
  }: UpdateProfileUseCase.Input): Promise<UpdateProfileUseCase.Output> {
    const profile = await this.profileRepository.findByAccountId(accountId);

    if (!profile) {
      throw new ResourceNotFound('Profile not found.');
    }

    profile.name = name;
    profile.birthDate = birthDate;
    profile.gender = gender;
    profile.height = height;
    profile.weight = weight;

    await this.profileRepository.save(profile);
  }
};

export namespace UpdateProfileUseCase {
  export type Input = {
    accountId: string;
    name: string;
    birthDate: Date;
    gender: Profile.Gender;
    height: number;
    weight: number;
  };

  export type Output = void;
}
