import { z } from "zod";

export interface ILoginSchema {
  email: string;
  password: string;
}

export interface ISignUpSchema {
  email: string;
  name: string;
  password: string;
  checkPassword: string;
}

export const loginSchema = z.object({
  email: z.string(),
  password: z.string({
    message: "아이디 또는 비밀번호를 확인해주세요.",
  }),
});

export const signUpSchema = z.object({
  email: z.string().min(1, { message: "이메일을 입력해 주세요." }),
  name: z.string().min(1, { message: "이름을 입력해 주세요." }),
  password: z.string().min(1, { message: "비밀번호를 입력해 주세요." }),
  checkPassword: z
    .string()
    .min(1, { message: "비밀번호를 한번 더 입력해 주세요." }),
});
