import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client";
import {
  DeleteBoardDocument,
  FetchBoardsListDocument,
} from "@/commons/graphql/graphql";

export const useBoardList = () => {
  const router = useRouter();
  const params = useParams();

  const { data } = useQuery(FetchBoardsListDocument, {
    variables: {
      startDate: "2021-09-03T09:54:33Z",
      endDate: "2024-10-30T18:54:33Z",
      search: "",
      page: Number(params.pageNum) || 1,
    },
  });
  // console.log(params.pageNum, data?.fetchBoards);

  const [deleteBoard] = useMutation(DeleteBoardDocument);
  const postDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    postId: string
  ) => {
    console.log(postId);
    e.stopPropagation();
    try {
      await deleteBoard({
        variables: {
          boardId: postId,
        },
        refetchQueries: [
          {
            query: FetchBoardsListDocument,
          },
        ],
      });
      alert("게시글이 삭제되었습니다.");
      // router.refresh();
    } catch (error) {
      alert("게시글 삭제에 실패했습니다.");
      console.log(error);
    }
  };

  const listItemMouseHandler = (
    e: React.MouseEvent<HTMLTableRowElement>,
    type: string
  ) => {
    const target = e.currentTarget;
    const childTarget =
      target.lastElementChild?.firstElementChild?.firstElementChild?.classList;
    if (type === "over") {
      childTarget?.remove("hidden");
    } else {
      childTarget?.add("hidden");
    }
  };

  const detailPageHandler = (
    e: React.MouseEvent<HTMLTableRowElement>,
    postId: string
  ) => {
    // console.log("detail", postId);
    router.push(`/boards/${postId}`);
  };

  return { data, postDelete, listItemMouseHandler, detailPageHandler };
};
