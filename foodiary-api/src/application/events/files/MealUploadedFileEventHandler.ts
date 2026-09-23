import { IFileEventHandler } from '@application/contracts/IFileEventHandler.js';
import { Injectable } from '@kernel/decoratos/Injectable.js';

@Injectable()
export class MealUploadedFileEventHandler implements IFileEventHandler {
  async handle({ fileKey }: IFileEventHandler.Input): Promise<void> {
    console.log({
      MealUploadedFileEventHandler: fileKey,
    });
  }
};
