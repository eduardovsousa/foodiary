import 'reflect-metadata';

import { CreateMealController } from '@application/controllers/meals/CreateMealController.js';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHttpAdapter.js';

export const handler = lambdaHttpAdapter(CreateMealController);
