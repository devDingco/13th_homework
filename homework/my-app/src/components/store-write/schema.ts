"use client";
import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "상품명을 입력해주세요"),
  remarks: z.string().min(1, "한줄 요약을 입력해주세요"),
  price: z.number().positive("가격은 0원 이상이어야 합니다").optional(),
  address: z.string().min(1, "주소를 입력해주세요"),
  zipcode: z.string().min(5, "우편번호를 입력해주세요"),
  contents: z.string().min(1, "상품 설명을 입력해주세요"),
  addressDetail: z.string().optional(),
});

export type ProductSchema = z.infer<typeof productSchema>;
