import { FetchTravelProductsQuery } from "../../commons/graphql/graphql";
import { z } from "zod";
import { productSchema } from "./schema";

export interface StoreWritePageProps {
  isEdit: boolean;
  //   data: FetchTravelProductsQuery;
  //   errors: any;
}
