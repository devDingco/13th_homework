import * as z from 'zod';

export const writeFormSchema = z.object({
  name: z.string().min(1, { message: '최소 1자리 이상 작성해주세요.' }),
  contents: z
    .string()
    .min(1, { message: '내용은 최소 1자 이상 작성해주세요.' }),
  // address: z.string().optional(),
});
