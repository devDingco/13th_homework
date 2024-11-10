import { z } from "zod";

export const schema = z.object({
  name: z.string().min(1, { message: "상품명을 입력해 주세요" }),
  remarks: z.string().min(1, { message: "한줄 요약을 입력해 주세요" }),
  contents: z.string().min(1, { message: "상품 설명을 입력해주세요" }),
  price: z.coerce.number().min(1, { message: "상품 가격을 입력해 주세요" }),
  tags: z.array(z.string()).optional(),
  zipcode: z
    .string()
    .min(1, { message: " 주소 검색을 통해 우편번호를 입력해 주세요." }),
  addressDetail: z.string(),
  lat: z.coerce.number(),
  lng: z.coerce.number(),
  images: z.array(z.string()).min(1, "이미지를 첨부해 주세요."),
});
