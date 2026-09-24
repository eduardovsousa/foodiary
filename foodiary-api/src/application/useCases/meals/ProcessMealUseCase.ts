import { Meal } from '@application/entities/Meal.js';
import { ResourceNotFound } from '@application/errors/application/ResourceNotFound.js';
import { MealRepository } from '@infra/database/dynamo/repositories/MealRepository.js';
import { Injectable } from '@kernel/decorators/Injectable.js';

const MAX_ATTEMPTS = 2;
@Injectable()
export class ProcessMealUseCase {
  constructor(private readonly mealRepository: MealRepository) { }

  async execute({
    accountId,
    mealId,
  }: ProcessMealUseCase.Input): Promise<ProcessMealUseCase.Output> {
    const meal = await this.mealRepository.findById({ accountId, mealId });

    if (!meal) {
      throw new ResourceNotFound(`Meal "${mealId}" not found.`);
    }

    if (meal.status === Meal.Status.UPLOADING) {
      throw new Error(`Meal "${mealId}" is still uploading.`);
    }

    if (meal.status === Meal.Status.PROCESSING) {
      throw new Error(`Meal "${mealId}" is already being processed.`);
    }

    if (meal.status === Meal.Status.SUCCESS) {
      return;
    }

    try {
      meal.status = Meal.Status.PROCESSING;
      meal.attempts += 1;
      await this.mealRepository.save(meal);

      // process with ia
      meal.status = Meal.Status.SUCCESS;
      meal.name = 'Café da tarde';
      meal.icon = '🥐';
      meal.foods = [
        {
          calories: 100,
          carbohydrates: 200,
          fats: 300,
          name: 'Pãozinho',
          proteins: 20,
          quantity: '2 unidade',
        },
      ];

      await this.mealRepository.save(meal);
    } catch (error) {
      meal.status = meal.attempts >= MAX_ATTEMPTS
        ? Meal.Status.FAILED
        : Meal.Status.QUEUED;

      await this.mealRepository.save(meal);

      throw error;
    }
  }
}

export namespace ProcessMealUseCase {
  export type Input = {
    accountId: string;
    mealId: string;
  };

  export type Output = void;
}
