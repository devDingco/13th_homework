import { CreateBoardInput } from '@/graphql/types';
import * as z from 'zod';

// 우선 제목, 내용, 작성자만
export interface IBoardsManager
  extends Pick<
    CreateBoardInput,
    'title' | 'contents' | 'writer' | 'password'
  > {}

export const boardsManagerSchema: z.ZodType<IBoardsManager> = z.object({
  title: z.string().min(1, { message: '제목을 입력하세요.' }),
  contents: z.string().min(1, { message: '내용을 입력하세요.' }),
  writer: z.string().min(1, { message: '작성자를 입력하세요.' }),
  password: z
    .string()
    .min(4, { message: '비밀번호는 최소 4자리 이상 입력해주세요.' })
    .max(15, { message: '비밀번호는 최대 15자리로 입력해주세요.' }),
});
