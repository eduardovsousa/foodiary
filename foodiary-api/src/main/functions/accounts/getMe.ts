import 'reflect-metadata';

import { GetMeController } from '@application/controllers/accounts/GetMeController.js';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHttpAdapter.js';

export const handler = lambdaHttpAdapter(GetMeController);
