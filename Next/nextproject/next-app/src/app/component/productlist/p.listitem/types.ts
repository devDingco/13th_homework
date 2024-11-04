import { FetchTravelproductsQuery } from "@/commons/graphql/graphql";

export interface IPropsPList {
  index: number;
  el: FetchTravelproductsQuery["fetchTravelproducts"][0];
}
