import { z } from "zod";

export const schema = z.object({
  writer: z.string().min(3, { message: "작성자는 3글자 이상입니다." }),
  title: z.string().min(3, { message: "제목은 3글자 이상입니다." }),
  contents: z.string(),
  // hobby: z.string().optional(),
  // password: z.string().min(8, { message: "비밀번호는 8글자 이상입니다." }),
  // phone: z
  //   .string()
  //   .regex(/^\d{3}-\d{3,4}-\d{4}$/, { message: "전화번호 형식이 아닙니다." }),
});
