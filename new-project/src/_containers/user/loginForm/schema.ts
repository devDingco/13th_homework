import { z } from "zod";

export const schema = z.object({
  email: z.string().email({ message: "이메일 형식이 일치하지 않습니다." }),
  password: z
    .string()
    .min(4, { message: "비밀번호는 4글자 이상입니다." })
    .max(25, { message: "비밀번호는 25글자 이하입니다." }),
});
