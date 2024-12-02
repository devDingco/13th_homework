import { z } from "zod";

export const newPostSchema: z.ZodType<I_schema> = z.object({
    writer: z.string().min(1, "작성자 명을 입력해 주세요."),
    password: z
        .string()
        .min(4, "비밀번호는 최소 4자리여야 합니다.")
        .max(24, "비밀번호는 최대 24자리까지만 가능합니다."),
    title: z.string().min(1, "제목을 입력해 주세요."),
    contents: z.string().min(1, "내용을 입력해 주세요."),
    link: z.string().optional(),
});

export interface I_schema {
    writer: string;
    password: string;
    title: string;
    contents: string;
    link?: string;
}
