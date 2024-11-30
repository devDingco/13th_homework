import { z } from "zod";

export const placeNewSchema: z.ZodType<type_schema> = z.object({
    name: z.string().min(1, "플레이스 이름을 입력해 주세요."),
    contents: z.string().min(1, "플레이스 내용을 입력해 주세요."),
});

export interface type_schema {
    name: string;
    contents: string;
}
