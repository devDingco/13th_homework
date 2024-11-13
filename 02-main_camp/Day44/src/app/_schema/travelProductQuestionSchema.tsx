import { z } from "zod";
export interface ITravelProductQuestionSchema {
  [key: string]: string;
  contents: string;
}

export const travelProductQuestionSchema = z.object({
  contents: z.string().min(1, { message: "문의사항을 입력해 주세요." }),
});
