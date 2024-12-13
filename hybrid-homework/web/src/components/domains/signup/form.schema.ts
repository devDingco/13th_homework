"use client";

import { z } from "zod";

export interface ISchema {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
}

export const schema: z.ZodType<ISchema> = z
  .object({
    email: z.string().min(1, { message: "이메일을 입력해 주세요." }),
    name: z.string().min(1, { message: "이름을 입력해 주세요." }),
    password: z.string().min(1, { message: "비밀번호를 입력해 주세요." }),
    passwordConfirm: z
      .string()
      .min(1, { message: "비밀번호를 입력해 주세요." }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"], // 에러 메시지를 표시할 필드 경로
  });
