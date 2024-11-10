import { z } from "zod";

export interface ITravelProductSchema {
  [key: string]: string | string[];
  name: string;
  remarks: string;
  contents: string;
  price: string;
  tags: string[];
  zipcode: string;
  address: string;
  addressDetail: string;
  lat: string;
  lng: string;
  images: string[];
}

export const travelProductSchema = z.object({
  name: z.string().min(1, { message: "상품명을 입력해 주세요." }),
  remarks: z.string().min(1, { message: "한 줄 요약을 입력해 주세요." }),
  contents: z.string().min(1, { message: "설명을 입력해 주세요." }),
  price: z.string().min(1, { message: "가격을 입력해 주세요." }),
  tags: z.array(z.string()).optional(),
  zipcode: z.string().optional(),
  address: z.string().optional(),
  addressDetail: z.string().optional(),
  lat: z.string().optional(),
  lng: z.string().optional(),
  images: z.array(z.string()).optional(),
});
