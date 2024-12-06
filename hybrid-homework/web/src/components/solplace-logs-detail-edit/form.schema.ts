"use client";

import { z } from "zod";

export const schema = z.object({
  title: z.string().min(1),
  contents: z.string().min(1),
  address: z.string(),
});
