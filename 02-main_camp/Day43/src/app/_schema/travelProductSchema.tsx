import { z } from "zod";

export interface ITravelProductSchema {
  name: string;
  remarks: string;
  contents: string;
  price: number;
  tags: string[];
  travelProductAddressInput: ITravelProductAddressInput;
  images: string[];
}

interface ITravelProductAddressInput {
  zipcode: string;
  address: string;
  addressDetail: string;
  lat: string;
  lng: string;
}

export const travelProductSchema = z.object({
  name: z.string(),
  remarks: z.string(),
  contents: z.string(),
  price: z.number(),
  tags: z.array(z.string()),
  travelProductAddressInput: z.object({
    zipcode: z.string(),
    address: z.string(),
    addressDetail: z.string(),
    lat: z.number(),
    lng: z.number(),
  }),
  images: z.array(z.string()),
});
