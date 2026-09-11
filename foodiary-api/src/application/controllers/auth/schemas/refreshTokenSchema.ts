import * as z from 'zod/mini';

export const refreshTokenSchema = z.object({
  refreshToken: z.string().check(
    z.minLength(1, '"refreshToken" is required'),
  ),
});

export type RefreshTokenBody = z.infer<typeof refreshTokenSchema>;
