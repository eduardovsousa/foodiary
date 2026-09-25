import 'reflect-metadata';

import { UpdateProfileController } from '@application/controllers/profiles/UpdateProfileController.js';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHttpAdapter.js';

export const handler = lambdaHttpAdapter(UpdateProfileController);
