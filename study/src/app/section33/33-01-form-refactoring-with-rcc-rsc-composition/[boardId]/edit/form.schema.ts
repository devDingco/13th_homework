"use client";

import { UpdateBoardInput } from "@/commons/graphql/graphql";
import { z } from "zod";

// 이미 있는 타입을 다운로드 받은 경우  =>  Omit으로 사용 가능(단, 안정성에 주의)
// Pick => 필요한 것만 가져올 때 사용
export interface ISchema extends Pick<UpdateBoardInput, "title" | "contents"> {}

export const schema: z.ZodType<ISchema> = z.object({
  title: z.string().min(1, { message: "제목을 입력해주세요." }),
  contents: z.string().min(1, { message: "내용을 입력해주세요." }),
});
