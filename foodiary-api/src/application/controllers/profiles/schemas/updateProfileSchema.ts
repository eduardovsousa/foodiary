import { Profile } from '@application/entities/Profile.js';
import * as z from 'zod/mini';

export const updateProfileSchema = z.object({
  name: z.string().check(
    z.minLength(1, '"name" is required'),
  ),
  birthDate: z.pipe(
    z.string().check(
      z.minLength(1, '"birthDate" is required'),
      z.iso.date('"birthDate" should be a valid date (YYYY-MM-DD)'),
    ),
    z.transform(date => new Date(date)),
  ),
  gender: z.enum(Profile.Gender, {
    error: issue => {
      const received = issue.input;
      return `Expected one of: ${Object.values(Profile.Gender).join(', ')} but received "${received}"`;
    },
  }),
  height: z.number().check(
    z.minimum(1, '"height" is required'),
    z.positive('"height" must be greater than 0'),
  ),
  weight: z.number().check(
    z.minimum(1, '"weight" is required'),
    z.positive('"weight" must be greater than 0'),
  ),
});

export type UpdateProfileBody = z.infer<typeof updateProfileSchema>;
