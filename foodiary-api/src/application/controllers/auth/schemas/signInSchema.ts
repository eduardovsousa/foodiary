import * as z from 'zod/mini';

export const signInSchema = z.object({
  email: z.string().check(
    z.minLength(1, 'Email is required'),
    z.email('Invalid email'),
  ),
  password: z.string().check(
    z.minLength(8, 'Password should be at least 8 characters long'),
  ),
});

export type SignInBody = z.infer<typeof signInSchema>;
