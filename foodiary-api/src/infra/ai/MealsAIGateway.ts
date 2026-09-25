import { Meal } from '@application/entities/Meal.js';
import { MealsFileStorageGateway } from '@infra/gateways/MealsFileStorageGateway.js';
import { Injectable } from '@kernel/decorators/Injectable.js';
import OpenAI from 'openai';

@Injectable()
export class MealsAIGateway {
  constructor(private readonly mealsFileStorageGateway: MealsFileStorageGateway) { }

  private readonly client = new OpenAI();

  async processMeal(meal: Meal): Promise<MealsAIGateway.ProcessMealResult> {
    if (meal.inputType === Meal.InputType.PICTURE) {
      const imageUrl = this.mealsFileStorageGateway.getFileURL(meal.inputFileKey);

      const response = await this.client.chat.completions.create({
        model: 'gpt-6-luna',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: {
                  url: imageUrl,
                  detail: 'high',
                },
              },
              {
                type: 'text',
                text: 'What is this image?',
              },
            ],
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
