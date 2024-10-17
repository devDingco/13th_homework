import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { FetchBoard } from "../../queires/queries";

export const UseDetailWrite = () => {
  const params = useParams();
  const router = useRouter();

  const { data } = useQuery(FetchBoard, {
    variables: {
      myboardId: params.boardId,
    },
  });
  console.log(data);
  const onModify = () => {
    router.push(`../../routes/boards/${data?.fetchBoard._id}/edit`);
  };

  const onList = () => {
    router.push("../../boards");
  };

  return {
    onModify,
    data,
    onList,
  };
};
