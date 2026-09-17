import { Meal } from '@application/entities/Meal.js';
import { MealRepository } from '@infra/database/dynamo/repositories/MealRepository.js';
import { Injectable } from '@kernel/decoratos/Injectable.js';

@Injectable(MealRepository)
export class CreateMealUseCase {
  constructor(private readonly mealRepository: MealRepository) { }

  async execute({
    accountId,
    file,
  }: CreateMealUseCase.Input): Promise<CreateMealUseCase.Output> {
    const meal = new Meal({
      accountId,
      inputType: file.inputType,
      status: Meal.Status.UPLOADING,
      inputFileKey: 'INPUT-FILE-KEY-EXAMPLE',
    });

    await this.mealRepository.create(meal);

    return {
      mealId: meal.id,
    };
  }
}

export namespace CreateMealUseCase {
  export type Input = {
    accountId: string;
    file: {
      size: number;
      inputType: Meal.InputType;
    }
  };

  export type Output = {
    mealId: string;
  };
}
