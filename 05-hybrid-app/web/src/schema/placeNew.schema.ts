import { z } from "zod";

export const placeNewSchema = z.object({
  title: z.string().min(1, "필수 입력 사항입니다."),
  contents: z.string().min(1, "필수 입력 사항입니다."),
  //이미지 넣기
  images: z.array(z.string()).optional().default([]),
});

export type PlaceNewValues = z.infer<typeof placeNewSchema>;
