import { z } from "zod";

export const schema = z.object({
  name: z.string().min(1, { message: "상품명을 입력해주세요." }),
  remarks: z.string().min(1, { message: "한줄요약을 입력해주세요." }),
  contents: z.string().min(1, { message: "내용을 입력해주세요." }),
  price: z.number().min(1, { message: "판매가격을 입력해주세요." }),
  tags: z.string().min(0, { message: "하,,," }),
  travelproductAddress: z.object({
    zipcode: z.string().min(1, { message: "우편번호를 입력해주세요." }),
    addressDetail: z.string().optional(), // addressDetail은 선택적 항목으로 처리
    // lat: z.number().nullable().optional(), // lat 값을 null과 undefined 모두 허용
    // lng: z.number().nullable().optional(), // lng 값을 null과 undefined 모두 허용
  }),
});
