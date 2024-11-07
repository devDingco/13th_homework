import { z } from "zod";

export interface IChangePasswordSchema {
  password: string;
  checkPassword: string;
}

export const changePasswordSchema = z.object({
  password: z.string(),
  checkPassword: z.string(),
});
