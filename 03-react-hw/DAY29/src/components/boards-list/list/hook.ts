import {
  DeleteBoardDocument,
  FetchBoardsDocument,
} from "@/commons/graphql/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { MouseEvent, useState } from "react";

export default function useBoardsList() {
  // 게시글 1페이지 불러오기
  const { data } = useQuery(FetchBoardsDocument, {
    variables: {
      page: 1,
    },
  });

  const [deleteBoard] = useMutation(DeleteBoardDocument);

  const handleDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      await deleteBoard({
        variables: { boardId: event.currentTarget.id },
        //삭제 후 자동 새로고침
        refetchQueries: [
          {
            query: FetchBoardsDocument,
            variables: { page: 1 }, // 필요한 변수를 명시적으로 지정
          },
        ],
      });
      alert("게시물이 성공적으로 삭제되었습니다.");
    } catch (error) {
      console.error(error);
      alert("게시물 삭제에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  // 마우스에 따른 삭제버튼 유무
  const [isHovered, setIsHovered] = useState<number | null>(null);

  return {
    data,
    handleDelete,
    isHovered,
    setIsHovered,
  };
}
