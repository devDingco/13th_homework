"use client";

import { FetchTravelproductQuery } from "@/commons/graphql/graphql";

export interface IProductRegistProps {
  isEdit: boolean;
  data?: FetchTravelproductQuery;
  fileRefArray: React.RefObject<HTMLInputElement>[];
}
