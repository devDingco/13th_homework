import { MutationLoginUserArgs } from '@/graphql/types';
import * as z from 'zod';

export interface ILoginType extends Required<MutationLoginUserArgs> {}

export const loginSchema: z.ZodType<ILoginType> = z.object({
  email: z.string().email({ message: '올바른 이메일 형식으로 작성해주세요.' }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요' }),
});
