"use client";

import { z } from "zod";

// TODO: 나중에 graphql 타입 다운받아와서 뽑아서 쓰기
export interface ISchema {
  title: string;
  contents: string;
  address: string;
  // images: string[];
}

export const schema: z.ZodType<ISchema> = z.object({
  title: z.string().min(1),
  contents: z.string().min(1),
  address: z.string().min(1),
  // images: z.array(z.string()).min(1).max(100),
});
