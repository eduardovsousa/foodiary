import { IFileEventHandler } from '@application/contracts/IFileEventHandler.js';
import { MealUploadedUseCase } from '@application/useCases/meals/MealUploadedUseCase.js';
import { Injectable } from '@kernel/decorators/Injectable.js';

@Injectable()
export class MealUploadedFileEventHandler implements IFileEventHandler {
  constructor(private readonly mealUploadedUseCase: MealUploadedUseCase) {}

  async handle({ fileKey }: IFileEventHandler.Input): Promise<void> {
    await this.mealUploadedUseCase.execute({ fileKey });
  }
}
