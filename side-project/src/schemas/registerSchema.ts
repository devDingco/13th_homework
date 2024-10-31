import * as z from 'zod';

export const registerSchema = z
  .object({
    name: z.string().min(1, { message: '이름을 입력해주세요.' }),
    password: z.string().min(1, { message: '비밀번호를 입력해주세요.' }),
    email: z.string().email({ message: '이메일 형식에 적합하지 않습니다.' }),
    confirmPassword: z
      .string()
      .min(1, { message: '비밀번호를 다시 한번 입력해주세요.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 서로 일치하지 않습니다.',
  });
