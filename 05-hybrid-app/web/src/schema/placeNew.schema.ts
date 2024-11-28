import { z } from "zod";

export const placeNewSchema = z.object({
  name: z.string().min(1, "필수 입력 사항입니다."),
  contents: z.string().min(1, "필수 입력 사항입니다."),
});

export type PlaceNewValues = z.infer<typeof placeNewSchema>;
