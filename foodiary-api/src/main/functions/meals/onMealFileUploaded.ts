import 'reflect-metadata';

import { MealUploadedFileEventHandler } from '@application/events/files/MealUploadedFileEventHandler.js';
import { lambdaS3Adapter } from '@main/adapters/lambdaS3Adapter.js';

export const handler = lambdaS3Adapter(MealUploadedFileEventHandler);
