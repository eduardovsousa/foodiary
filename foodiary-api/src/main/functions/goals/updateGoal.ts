import 'reflect-metadata';

import { UpdateGoalController } from '@application/controllers/goals/UpdateGoalController.js';
import { Registry } from '@kernel/di/Registry.js';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHttpAdapter.js';

const controller = Registry.getInstance().resolve(UpdateGoalController);

export const handler = lambdaHttpAdapter(controller);
