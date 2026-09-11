import * as z from 'zod/mini';

export const forgotPasswordSchema = z.object({
  email: z.string().check(
    z.minLength(1, '"email" is required'),
    z.email('Invalid email'),
  ),
});

export type ForgotPasswordBody = z.infer<typeof forgotPasswordSchema>;
