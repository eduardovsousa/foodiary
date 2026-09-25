/* eslint-disable no-console */
import OpenAI, { toFile } from 'openai';
import { zodTextFormat } from 'openai/helpers/zod';
import type { ResponseInputContent } from 'openai/resources/responses/responses';

import { Meal } from '@application/entities/Meal.js';
import { MealsFileStorageGateway } from '@infra/gateways/MealsFileStorageGateway.js';
import { Injectable } from '@kernel/decorators/Injectable.js';
import { downloadFileFromUrl } from '@shared/utils/downloadFileFromUrl.js';
import { z } from 'zod/mini';
import { getImagePrompt } from '../prompts/getImagePrompt.js';
import { getTextPrompt } from '../prompts/getTextPrompt.js';

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

  async processMeal(
    meal: Meal,
  ): Promise<MealsAIGateway.ProcessMealResult> {
    const mealFileUrl =
      this.mealsFileStorageGateway.getFileURL(meal.inputFileKey);

    if (meal.inputType === Meal.InputType.PICTURE) {
      return this.callAI({
        mealId: meal.id,
        systemPrompt: getImagePrompt(),
        userMessagesParts: [
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
      });
    }

    const transcription = await this.transcribe(mealFileUrl);

    return this.callAI({
      mealId: meal.id,
      systemPrompt: getTextPrompt(),
      userMessagesParts:
        `Meal date: ${meal.createdAt}\n\nMeal: ${transcription}`,
    });
  }

  private async callAI({
    mealId,
    systemPrompt,
    userMessagesParts,
  }: MealsAIGateway.CallAIParams): Promise<MealsAIGateway.ProcessMealResult> {
    const response = await this.client.responses.parse({
      model: 'gpt-6-luna',
      reasoning: {
        effort: 'low',
      },
      input: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userMessagesParts,
        },
      ],
      text: {
        format: zodTextFormat(mealSchema, 'meal'),
      },
    });

    const mealDetails = response.output_parsed;

    if (!mealDetails) {
      console.error('OpenAi response:', JSON.stringify(response, null, 2));

      throw new Error(`Failed to processing meal "${mealId}"`);
    }

    const { success, data, error } = mealSchema.safeParse(mealDetails);

    if (!success) {
      console.log('Zod error:', JSON.stringify(error.issues));
      console.error('OpenAi response:', JSON.stringify(response, null, 2));

      throw new Error(`Failed to processing meal "${mealId}"`);
    }

    return data;
  }

  private async transcribe(audioFileUrl: string) {
    const audioFile = await downloadFileFromUrl(audioFileUrl);

    const { text } = await this.client.audio.transcriptions.create({
      model: 'gpt-4o-mini-transcribe',
      file: await toFile(audioFile, 'audio.m4a', {
        type: 'audio/m4a',
      }),
    });

    return text;
  }
}

export namespace MealsAIGateway {
  export type ProcessMealResult = {
    name: string;
    icon: string;
    foods: Meal.Food[];
  };

  export type CallAIParams = {
    mealId: string;
    systemPrompt: string;
    userMessagesParts: string | ResponseInputContent[];
  };
}
