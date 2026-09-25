/* eslint-disable no-console */
import OpenAI, { toFile } from 'openai';
import { zodTextFormat } from 'openai/helpers/zod';

import { Meal } from '@application/entities/Meal.js';
import { MealsFileStorageGateway } from '@infra/gateways/MealsFileStorageGateway.js';
import { Injectable } from '@kernel/decorators/Injectable.js';
import { downloadFileFromUrl } from '@shared/utils/downloadFileFromUrl.js';
import { z } from 'zod/mini';
import { getImagePrompt } from '../prompts/getImagePrompt.js';

const mealSchema = z.object({
  name: z.string(),
  icon: z.string(),
  foods: z.array(z.object({
    name: z.string(),
    quantity: z.string(),
    calories: z.number(),
    carbohydrates: z.number(),
    fats: z.number(),
    proteins: z.number(),
  })),
});

@Injectable()
export class MealsAIGateway {
  constructor(private readonly mealsFileStorageGateway: MealsFileStorageGateway) { }

  private readonly client = new OpenAI();

  async processMeal(meal: Meal): Promise<MealsAIGateway.ProcessMealResult> {
    const mealFileUrl = this.mealsFileStorageGateway.getFileURL(meal.inputFileKey);
    if (meal.inputType === Meal.InputType.PICTURE) {
      const response = await this.client.responses.parse({
        model: 'gpt-6-luna',

        reasoning: {
          effort: 'low',
        },

        input: [
          {
            role: 'system',
            content: getImagePrompt(),
          },
          {
            role: 'user',
            content: [
              {
                type: 'input_image',
                image_url: mealFileUrl,
                detail: 'high',
              },
              {
                type: 'input_text',
                text: `Meal date: ${meal.createdAt}`,
              },
            ],
          },
        ],

        text: {
          format: zodTextFormat(mealSchema, 'meal'),
        },
      });
      const mealDetails = response.output_parsed;

      if (!mealDetails) {
        console.error('OpenAi response:', JSON.stringify(response, null, 2));
        throw new Error(`Failed to processing meal "${meal.id}"`);
      }
      const { success, data, error } = mealSchema.safeParse(mealDetails);

      if (!success) {
        console.log('Zod error:', error);
        console.error('OpenAi response:', JSON.stringify(response, null, 2));
        throw new Error(`Failed to processing meal "${meal.id}"`);
      }

      return data;
    }

    const audioFile = await downloadFileFromUrl(mealFileUrl);

    // audio
    const { text } = await this.client.audio.transcriptions.create({
      model: 'gpt-4o-mini-transcribe',
      file: await toFile(audioFile, 'audio.m4a', { type: 'audio/m4a' }),
    });

    console.log(JSON.stringify(text, null, 2));

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
