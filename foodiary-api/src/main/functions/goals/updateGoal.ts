import 'reflect-metadata';

import { UpdateGoalController } from '@application/controllers/goals/UpdateGoalController.js';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHttpAdapter.js';

export const handler = lambdaHttpAdapter(UpdateGoalController);
