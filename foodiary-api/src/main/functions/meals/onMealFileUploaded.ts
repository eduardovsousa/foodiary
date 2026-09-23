import 'reflect-metadata';

import { MealUploadedFileEventHandler } from '@application/events/files/MealUploadedFileEventHandler.js';
import { Registry } from '@kernel/di/Registry.js';
import { lambdaS3Adapter } from '@main/adapters/lambdaS3Adapter.js';

const eventHandler = Registry.getInstance().resolve(MealUploadedFileEventHandler);

export const handler = lambdaS3Adapter(eventHandler);
