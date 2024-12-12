"use client";

import { z } from "zod";

export interface ISchema {
  email: string;
  password: string;
}

export const schema: z.ZodType<ISchema> = z.object({
  email: z.string().min(1, { message: "이메일을 입력해 주세요." }),
  password: z.string().min(1, { message: "비밀번호를 입력해 주세요." }),
});
