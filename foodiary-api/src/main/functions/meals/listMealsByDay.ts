import 'reflect-metadata';

import { ListMealsByDayController } from '@application/controllers/meals/ListMealsByDayController.js';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHttpAdapter.js';

export const handler = lambdaHttpAdapter(ListMealsByDayController);
