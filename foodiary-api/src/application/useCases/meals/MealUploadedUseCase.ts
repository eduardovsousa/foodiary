import { Meal } from '@application/entities/Meal.js';
import { ResourceNotFound } from '@application/errors/application/ResourceNotFound.js';
import { MealRepository } from '@infra/database/dynamo/repositories/MealRepository.js';
import { MealsFileStorageGateway } from '@infra/gateways/MealsFileStorageGateway.js';
import { Injectable } from '@kernel/decorators/Injectable.js';

@Injectable()
export class MealUploadedUseCase {
  constructor(
    private readonly mealsFileStorageGateway: MealsFileStorageGateway,
    private readonly mealRepository: MealRepository,
  ) { }

  async execute({
    fileKey,
  }: MealUploadedUseCase.Input): Promise<MealUploadedUseCase.Output> {
    const { accountId, mealId } = await this.mealsFileStorageGateway.getFileMetadata({ fileKey });

    const meal = await this.mealRepository.findById({
      accountId,
      mealId,
    });

    if (!meal) {
      throw new ResourceNotFound('Meal not found.');
    }

    meal.status = Meal.Status.QUEUED;

    await this.mealRepository.save(meal);
  }
}

export namespace MealUploadedUseCase {
  export type Input = {
    fileKey: string;
  };

  export type Output = void;
}
