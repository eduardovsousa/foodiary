import KSUID from 'ksuid';

import { createPresignedPost } from '@aws-sdk/s3-presigned-post';

import { Meal } from '@application/entities/Meal.js';
import { s3client } from '@infra/clients/s3client.js';
import { Injectable } from '@kernel/decoratos/Injectable.js';
import { AppConfig } from '@shared/config/AppConfig.js';
import { minutesToSeconds } from '@shared/utils/minutesToSeconds.js';

@Injectable(AppConfig)
export class MealsFileStorageGateway {
  constructor(private readonly appConfig: AppConfig) { }

  static generateInputFileKey({
    accountId,
    inputType,
  }: MealsFileStorageGateway.GenerateInputFileKey): string {
    const extension = inputType === Meal.InputType.AUDIO ? 'm4a' : 'jpeg';
    const filename = `${KSUID.randomSync().string}.${extension}`;

    return `${accountId}/${filename}`;
  }

  async createPOST({
    fileKey,
    inputType,
    fileSize,
  }: MealsFileStorageGateway.CreatePOSTParams): Promise<MealsFileStorageGateway.CreatePOSTResult> {
    const bucket = this.appConfig.storage.mealsBucket;
    const contentType = inputType === Meal.InputType.AUDIO ? 'audio/m4a' : 'image/jpeg';

    const { url, fields } = await createPresignedPost(s3client, {
      Bucket: bucket,
      Key: fileKey,
      Expires: minutesToSeconds(5),
      Conditions: [
        { bucket },
        ['eq', '$key', fileKey],
        ['eq', '$Content-Type', contentType],
        ['content-length-range', fileSize, fileSize],
      ],
    });

    const uploadSignature = Buffer.from(
      JSON.stringify({ url, fields }),
    ).toString('base64');

    return { uploadSignature };
  }
}

export namespace MealsFileStorageGateway {
  export type GenerateInputFileKey = {
    accountId: string;
    inputType: Meal.InputType;
  }

  export type CreatePOSTParams = {
    fileKey: string;
    fileSize: number;
    inputType: Meal.InputType;
  }

  export type CreatePOSTResult = {
    uploadSignature: string;
  }
}
