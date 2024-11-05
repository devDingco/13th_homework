import { z } from "zod";

export const schema = z.object({
  email: z
    .string()
    .min(1, { message: "이메일을 입력해 주세요." })
    .email("올바른 이메일 형식이 아닙니다."),
  password: z.string().min(1, { message: "비밀번호를 입력해 주세요." }),
});
