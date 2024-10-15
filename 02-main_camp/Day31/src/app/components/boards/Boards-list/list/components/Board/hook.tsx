import { DeleteBoardDocument } from "@/commons/gql/graphql";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

// 계속 반복되는 타입이 존재함. 어떻게 할래?
const useBoard = ({ id, refetch }: any) => {
  const router = useRouter();
  const [deleteBoard] = useMutation(DeleteBoardDocument);

  const onClickBoard = () => {
    router.push(`/boards/${id}`);
  };

  const onClickDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    deleteBoard({
      variables: {
        id: id,
      },
    });
    refetch({ page: 1 });
  };

  return {
    onClickBoard,
    onClickDelete,
  };
};

export default useBoard;
