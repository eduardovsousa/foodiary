import 'reflect-metadata';

import { CreateMealController } from '@application/controllers/meals/CreateMealController.js';
import { Registry } from '@kernel/di/Registry.js';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHttpAdapter.js';

const controller = Registry.getInstance().resolve(CreateMealController);

export const handler = lambdaHttpAdapter(controller);
