"use client";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Button } from "antd";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      likeCount
    }
  }
`;

const LIKE_BOARD = gql`
  mutation LikeBoard($boardId: ID!) {
    likeBoard(boardId: $boardId)
  }
`;

export default function OptimisticUiPage() {
  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: "67323f9f9712e0002973f1ea" },
  });
  const [likeBoard] = useMutation(LIKE_BOARD);

  const onClickLike = async () => {
    // 좋아요 올리기
    await likeBoard({
      variables: { boardId: "67323f9f9712e0002973f1ea" },
      // refetchQueries: [{ query: FETCH_BOARD, variables: { boardId: "123" } }],

      // optimisticResponse는 서버에서 응답을 받기 전에 미리 업데이트를 해준다.
      optimisticResponse: {
        likeBoard: (data?.fetchBoard.likeCount ?? 0) + 1,
      },

      // update로 캐시를 직접 업데이트할 수 있다.
      update: (cache, { data }) => {
        // 요청해서 리턴해주는 값이 data.likeBoard에 들어가게 된다.
        cache.writeQuery({
          query: FETCH_BOARD, // 캐시에 있는 쿼리
          variables: { boardId: "67323f9f9712e0002973f1ea" }, // 쿼리에 들어가는 변수
          data: {
            // 쿼리에 들어가는 데이터
            fetchBoard: {
              _id: "67323f9f9712e0002973f1ea", // 게시글 아이디
              __typename: "Board", // 타입 이름 (필수) -> 캐시에 저장된 데이터의 타입이름과 일치해야한다.
              likeCount: data.likeBoard, // 좋아요 갯수
            },
          },
        });
      },
    });
  };

  return (
    <>
      <div>현재카운트(좋아요) : {data?.fetchBoard.likeCount ?? 0}</div>
      <Button onClick={onClickLike}>좋아요 올리기</Button>
    </>
  );
}
