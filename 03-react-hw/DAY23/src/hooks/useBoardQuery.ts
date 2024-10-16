import { useQuery, useMutation } from "@apollo/client";
import {
  FetchBoardsDocument,
  FetchBoardDocument,
  DeleteBoardDocument,
  FetchBoardsQuery,
  FetchBoardsQueryVariables,
  FetchBoardQuery,
  FetchBoardQueryVariables,
  DeleteBoardMutation,
  DeleteBoardMutationVariables,
} from "@/commons/graphql/graphql";

export const useBoardQuery = (boardId?: string) => {
  const {
    data: boardsData,
    loading: boardsLoading,
    error: boardsError,
    refetch: refetchBoards,
  } = useQuery<FetchBoardsQuery, FetchBoardsQueryVariables>(
    FetchBoardsDocument,
    { variables: { page: 1 } }
  );

  const {
    data: boardData,
    loading: boardLoading,
    error: boardError,
  } = useQuery<FetchBoardQuery, FetchBoardQueryVariables>(FetchBoardDocument, {
    variables: { boardId: boardId || "" },
    skip: !boardId,
  });

  const [deleteBoard] = useMutation<
    DeleteBoardMutation,
    DeleteBoardMutationVariables
  >(DeleteBoardDocument);

  const handleDelete = async (id: string) => {
    try {
      await deleteBoard({ variables: { boardId: id } });
      alert("게시글이 삭제되었습니다.");
      refetchBoards();
    } catch (error) {
      alert("게시글 삭제에 실패했습니다.");
      console.error("게시글 삭제 오류:", error);
    }
  };

  return {
    boards: boardsData?.fetchBoards,
    board: boardData?.fetchBoard,
    loading: boardsLoading || boardLoading,
    error: boardsError || boardError,
    handleDelete,
    refetchBoards,
  };
};
