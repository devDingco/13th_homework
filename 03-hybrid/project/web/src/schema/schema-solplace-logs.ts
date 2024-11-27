import z from "zod";

export type SolPlaceLogsType = z.infer<typeof SolPlaceLogsSchema>;

export const SolPlaceLogsSchema = z.object({
  images: z.array(z.string()).optional(),
  name: z.string().min(3, "플레이스 이름은 3자 이상 입력해 주세요."),
  address: z.string().optional(),
  lat: z.string().optional(),
  lng: z.string().optional(),
  contents: z.string().min(10, "플레이스 내용은 10자 이상 입력해 주세요."),
});
