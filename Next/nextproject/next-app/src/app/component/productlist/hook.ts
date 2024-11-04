import { useQuery } from "@apollo/client";
import { FETCHTRAVELPRODUCTS } from "../queires/queries";

export default function UseProductListPage() {
  const { data } = useQuery(FETCHTRAVELPRODUCTS);

  return { data };
}
