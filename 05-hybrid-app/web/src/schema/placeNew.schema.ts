import { z } from "zod";

export const placeNewSchema = z.object({
  title: z.string().min(1, "필수 입력 사항입니다."),
  address: z.string().min(1, { message: "주소를 선택해주세요." }),
  lat: z.number(),
  lng: z.number(),
  contents: z.string().min(1, "필수 입력 사항입니다."),
  //이미지 넣기
  images: z.array(z.string()).optional().default([]),
});

export type PlaceNewValues = z.infer<typeof placeNewSchema>;
