import { Meal } from '@application/entities/Meal.js';
import { Injectable } from '@kernel/decorators/Injectable.js';
import OpenAI from 'openai';

@Injectable()
export class MealsAIGateway {
  private readonly client = new OpenAI();

  async processMeal(meal: Meal): Promise<MealsAIGateway.ProcessMealResult> {
    if (meal.inputType === Meal.InputType.PICTURE) {
      const response = await this.client.chat.completions.create({
        model: 'gpt-6-luna',
        messages: [
          {
            role: 'user',
            content: 'Who are you?',
          },
        ],
      });

      console.log(JSON.stringify(response, null, 2));
    }

    return {
      name: '',
      icon: '',
      foods: [],
    };
  }
}

export namespace MealsAIGateway {
  export type ProcessMealResult = {
    name: string;
    icon: string;
    foods: Meal.Food[];
  }
}
