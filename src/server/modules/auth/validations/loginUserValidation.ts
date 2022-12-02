import { z } from 'zod';

export const loginUserValidation = z.object({
  email: z.string().email(),
  password: z.string(),
});
