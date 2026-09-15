import { Profile } from '@application/entities/Profile.js';
import * as z from 'zod/mini';

export const signUpSchema = z.object({
  account: z.object({
    email: z.string().check(
      z.minLength(1, '"email" is required'),
      z.email('Invalid email'),
    ),
    password: z.string().check(
      z.minLength(8, '"password" should be at least 8 characters long'),
    ),
  }),
  profile: z.object({
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
    activityLevel: z.enum(Profile.ActivityLevel, {
      error: issue => {
        const received = issue.input;
        return `Expected one of: ${Object.values(Profile.ActivityLevel).join(', ')} but received "${received}"`;
      },
    }),
  }),
});

export type SignUpBody = z.infer<typeof signUpSchema>;
