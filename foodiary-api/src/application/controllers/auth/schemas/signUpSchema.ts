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
});

export type SignUpBody = z.infer<typeof signUpSchema>;
