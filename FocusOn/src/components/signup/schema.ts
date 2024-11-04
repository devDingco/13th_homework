import { z } from "zod";

// interface ISchema {
//   email
//   name
//   password
//   passwordConfirm
// }

export const schema = z
  .object({
    email: z
      .string()
      .min(1, { message: "이메일을 입력해 주세요" })
      .email("올바른 이메일 형식이 아닙니다."),
    name: z.string().min(1, { message: "이름을 입력해 주세요" }),
    password: z
      .string()
      .min(1, { message: "비밀번호를 입력해 주세요" })
      .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." }),
    passwordConfirm: z.string().min(1, { message: "비밀번호를 입력해 주세요" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });
