import { z } from "zod";

export const schema = z.object({
  email: z.string().email("이메일 형식에 적합하지 않습니다."),
  password: z
    .string()
    .min(4, { message: "비밀번호는 최소 4자리 이상 입력해주세요" })
    .max(15, { message: "비밀번호는 최대 15자리 입니다." }),
});
