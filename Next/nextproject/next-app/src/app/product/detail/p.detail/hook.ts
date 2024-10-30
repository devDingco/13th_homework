import { FETCHTRAVELPRODUCT } from "@/app/component/queires/queries";
import { useQuery } from "@apollo/client";

export default function UseProductDetail() {
  const { data } = useQuery(FETCHTRAVELPRODUCT);
}
