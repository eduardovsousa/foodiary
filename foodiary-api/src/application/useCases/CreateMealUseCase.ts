import { Injectable } from '@kernel/decoratos/Injectable.js';

@Injectable()
export class CreateMealUseCase {
  async execute(): Promise<any> {
    return {
      CreateMealUseCase: 'CreateMealUseCase',
    };
  }
}
