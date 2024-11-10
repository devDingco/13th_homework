import { z } from "zod";

export const loginSchema: z.ZodType<I_schema> = z.object({
    email: z.string().min(1, "이메일을 입력해 주세요.").email("이메일 형식을 확인해 주세요."),
    password: z
        .string()
        .min(4, "비밀번호는 최소 4자리여야 합니다.")
        .max(24, "비밀번호는 최대 24자리까지만 가능합니다."),
});

export const signupSchema: z.ZodType<I_schema> = z
    .object({
        email: z.string().min(1, "이메일을 입력해 주세요.").email("이메일 형식을 확인해 주세요."),
        name: z.string().min(1, "이름을 입력해 주세요."),
        password: z
            .string()
            .min(4, "비밀번호는 최소 4자리여야 합니다.")
            .max(24, "비밀번호는 최대 24자리까지만 가능합니다."),
        pwConfirm: z.string().min(1, "비밀번호를 확인해 주세요."),
    })
    .superRefine(({ password, pwConfirm }, ctx) => {
        if (password !== pwConfirm) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "비밀번호가 일치하지 않습니다!",
                path: ["pwConfirm"],
            });
        }
    });

export interface I_schema {
    email: string;
    name?: string;
    password: string;
    pwConfirm?: string;
}
