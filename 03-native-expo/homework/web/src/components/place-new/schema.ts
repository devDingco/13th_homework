import { z } from "zod";

export const placeNewSchema: z.ZodType<type_schema> = z.object({
    이름: z.string().min(1, "플레이스 이름을 입력해 주세요."),
    내용: z.string().min(1, "플레이스 내용을 입력해 주세요."),
});

export interface type_schema {
    이름: string;
    내용: string;
}
