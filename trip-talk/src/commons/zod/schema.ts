import { z } from "zod";

export const schema = z
  .object({
    email: z.string().email("이메일 형식이여야 합니다."),
    name: z.string().min(1, { message: "이름을 입력해 주세요." }),
    password: z
      .string()
      .min(4, { message: "비밀번호는 4자리 이상이여야 합니다." })
      .max(15, { message: "비밀번호는 최대 15자리 까지만 허용됩니다." }),
    checkPassword: z
      .string()
      .min(1, { message: "비밀번호를 한 번 더 입력해 주세요." }),
  })
  .superRefine(({ checkPassword, password }, ctx) => {
    if (checkPassword !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "비밀번호가 일치하지 않습니다.",
        path: ["checkPassword"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "비밀번호가 일치하지 않습니다.",
        path: ["password"],
      });
    }
  });
