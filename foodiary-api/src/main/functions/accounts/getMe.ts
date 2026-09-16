import 'reflect-metadata';

import { GetMeController } from '@application/controllers/accounts/GetMeController.js';
import { Registry } from '@kernel/di/Registry.js';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHttpAdapter.js';

const controller = Registry.getInstance().resolve(GetMeController);

export const handler = lambdaHttpAdapter(controller);
