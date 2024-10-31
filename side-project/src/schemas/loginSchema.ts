import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: '올바른 이메일 형식으로 작성해주세요.' }),
});
