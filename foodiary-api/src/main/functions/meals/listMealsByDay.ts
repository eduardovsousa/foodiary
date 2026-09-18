import 'reflect-metadata';

import { ListMealsByDayController } from '@application/controllers/meals/ListMealsByDayController.js';
import { Registry } from '@kernel/di/Registry.js';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHttpAdapter.js';

const controller = Registry.getInstance().resolve(ListMealsByDayController);

export const handler = lambdaHttpAdapter(controller);
