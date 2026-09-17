import { Meal } from '@application/entities/Meal.js';
import { Injectable } from '@kernel/decoratos/Injectable.js';
import KSUID from 'ksuid';

@Injectable()
export class MealsFileStorageGateway {
  static generateInputFileKey({
    accountId,
    inputType,
  }: MealsFileStorageGateway.GenerateInputFileKey): string {
    const extension = inputType === Meal.InputType.AUDIO ? 'm4a' : 'jpeg';
    const filename = `${KSUID.randomSync().string}.${extension}`;

    return `${accountId}/${filename}`;
  }

  async createPOST() { }
}

export namespace MealsFileStorageGateway {
  export type GenerateInputFileKey = {
    accountId: string;
    inputType: Meal.InputType;
  }
}
