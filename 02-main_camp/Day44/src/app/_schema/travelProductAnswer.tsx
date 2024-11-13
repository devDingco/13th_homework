import { z } from "zod";
export interface ITravelProductAnswerSchema {
  contents: string;
}

export const travelProductAnswerSchema = z.object({
  contents: z.string().min(1, { message: "답변을 입력해 주세요." }),
});
