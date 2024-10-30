import { FETCHTRAVELPRODUCT } from "@/app/component/queires/queries";
import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";

export default function UseProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { data } = useQuery(FETCHTRAVELPRODUCT, {
    variables: {
      travelproductId: params.travelproductId,
    },
  });

  const onClickUpdate = () => {
    router.push(`../../product/${data?.fetchTravelproduct._id}/edit`);
  };
  return {
    data,
    onClickUpdate,
  };
}
