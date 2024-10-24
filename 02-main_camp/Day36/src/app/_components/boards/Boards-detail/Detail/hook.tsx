import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import {
  FetchBoardCommentsDocument,
  FetchBoardDocument,
} from "@/commons/gql/graphql";
import { useState } from "react";

const useBoardsDetail = () => {
  const router = useRouter();
  const params = useParams();

  const [hasMore, setHasMore] = useState(true);

  const { data } = useQuery(FetchBoardDocument, {
    variables: {
      boardId: params.boardId as string,
    },
  });

  const { data: comments } = useQuery(FetchBoardCommentsDocument, {
    variables: {
      page: 1,
      boardId: String(params.boardId),
    },
  });

  const board = {
    title: data?.fetchBoard.title,
    writer: String(data?.fetchBoard.writer),
    contents: data?.fetchBoard.contents,
    address: data?.fetchBoard.boardAddress?.address,
    youtubeUrl: data?.fetchBoard.youtubeUrl,
    images: data?.fetchBoard.images ?? [],
  };

  // Youtube URL의 v= 짤라서 ID를 통해 비디오 보여주도록 구현 필요함.

  const onClickEdit = () => {
    router.push(`/boards/${params.boardId}/edit`);
  };

  const onClickShowBoards = () => {
    router.push("/boards");
  };

  const toggleHasMoreScroll = () => {
    setHasMore((prev) => !prev);
  };

  return {
    board,
    comments,
    hasMore,
    onClickEdit,
    onClickShowBoards,
    toggleHasMoreScroll,
  };
};

export default useBoardsDetail;
