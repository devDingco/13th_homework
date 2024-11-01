import { ContentCutSharp } from "@mui/icons-material";
import { z } from "zod";

export const schema = z.object({
  name: z.string().min(1, { message: "상품명을 입력해 주세요" }),
  remarks: z.string().min(1, { message: "한줄요약을 입력해 주세요" }),
  contents: z.string().min(1, { message: "상품설명을 입력해주세요" }),
  price: z.number().min(1, { message: "상품 가격을 입력해 주세요" }),
  tags: z.array(z.string()).optional(),
});
