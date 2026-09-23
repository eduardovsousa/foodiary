import { ResourceNotFound } from '@application/errors/application/ResourceNotFound.js';
import { GoalRepository } from '@infra/database/dynamo/repositories/GoalRepository.js';
import { Injectable } from '@kernel/decorators/Injectable.js';

@Injectable()
export class UpdateGoalUseCase {
  constructor(private readonly goalRepository: GoalRepository) { }

  async execute({
    accountId,
    calories,
    carbohydrates,
    fats,
    proteins,
  }: UpdateGoalUseCase.Input): Promise<UpdateGoalUseCase.Output> {
    const goal = await this.goalRepository.findByAccountId(accountId);

    if (!goal) {
      throw new ResourceNotFound('Goal not found.');
    }

    goal.calories = calories;
    goal.carbohydrates = carbohydrates;
    goal.fats = fats;
    goal.proteins = proteins;

    await this.goalRepository.save(goal);
  }
};

export namespace UpdateGoalUseCase {
  export type Input = {
    accountId: string;
    calories: number;
    proteins: number;
    carbohydrates: number;
    fats: number;
  };

  export type Output = void;
}
