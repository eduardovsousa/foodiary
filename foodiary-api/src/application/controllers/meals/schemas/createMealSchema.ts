import { mbToBytes } from '@shared/utils/mbToBytes.js';
import * as z from 'zod/mini';

export const createMealSchema = z.object({
  file: z.object({
    type: z.enum(['audio/m4a', 'image/jpeg'], {
      error: issue => {
        const received = issue.input;
        return `Expected one of: 'audio/m4a', 'image/jpeg' but received "${received}"`;
      },
    }),

    size: z.number({
      error: 'File size must be a number in bytes.',
    }).check(
      z.minimum(1, 'File size must be at least 1 byte.'),
      z.maximum(
        mbToBytes(10),
        'File size must be at most 10MB.',
      ),
    ),
  }),
});

export type CreateMealBody = z.infer<typeof createMealSchema>;
