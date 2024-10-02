import Icon from "@/components/iconFactory";
import { useMutation, gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface LikeCountBtnProps {
  type: "like" | "dislike";
}

const FETCH_LIKECOUNT = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      likeCount
      dislikeCount
    }
  }
`;

const LIKE_BOARD = gql`
  mutation likeBoard($boardId: ID!) {
    likeBoard(boardId: $boardId)
  }
`;

const DISLIKE_BOARD = gql`
  mutation dislikeBoard($boardId: ID!) {
    dislikeBoard(boardId: $boardId)
  }
`;

export default function LikeCountBtn(props: LikeCountBtnProps) {
  const params = useParams();
  const { type } = props;

  const { data } = useQuery(FETCH_LIKECOUNT, {
    variables: { boardId: params.boardId },
  });
  console.log(data);

  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    setLikeCount(
      type === "like"
        ? data?.fetchBoard.likeCount
        : data?.fetchBoard.dislikeCount
    );
  }, [data, type]);

  const [likeBoardHandler] = useMutation(
    type === "like" ? LIKE_BOARD : DISLIKE_BOARD
  );

  const likeCountHandler = async () => {
    const result = await likeBoardHandler({
      variables: { boardId: params.boardId },
      refetchQueries: [{ query: FETCH_LIKECOUNT }],
    });
    setLikeCount(
      type === "like" ? result.data.likeBoard : result.data.dislikeBoard
    );
    console.log(result);
  };

  return (
    <button
      className="flex items-center flex-col gap-1"
      onClick={() => likeCountHandler()}
    >
      <div className="w-6 h-6">
        <Icon
          icon={type === "like" ? "good" : "bad"}
          className={type === "like" ? "fill-red-600" : "fill-gray-600"}
        ></Icon>
      </div>
      <div className={type === "like" ? "text-red-600" : "text-gray-600"}>
        {likeCount}
      </div>
    </button>
  );
}
