"use client";

import { gql, useMutation, useQuery } from "@apollo/client";

const FETCH_BOARDS = gql`
  query fetchBoards14_01($mypage: Int) {
    fetchBoards(page: $mypage) {
      _id
      writer
      title
      contents
    }
  }
`;
const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;
const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function StaticRoutingMovedPage() {
  const { data } = useQuery(FETCH_BOARDS);
  const [createBoard] = useMutation(CREATE_BOARD);
  const [deleteBoard] = useMutation(DELETE_BOARD);

  const onClickDelete = (boardId) => async () => {
    await deleteBoard({
      variables: { boardId: boardId },
      //   refetchQueries: [{ query: FETCH_BOARDS }],
      update(cache, { data }) {
        cache.modify({
          fields: {
            fetchBoards: (prev, { readField }) => {
              console.log(prev);
              const deletedId = data.deleteBoard; //_id 삭제된 완료 된 아이디
              const filteredPrev = prev.filter(
                (el) => readField("_id", el) !== deletedId
              );
              return [...filteredPrev]; // 삭제된 아이디를 제외한 나머지만 리턴
            },
          },
        });
      },
    });
  };

  const onClickSubmit = async () => {
    await createBoard({
      variables: {
        createBoardInput: {
          writer: "테스트 작성자",
          password: "1234",
          title: "테스트 제목",
          contents: "졸지 않습니다.",
        },
      },
      //   refetchQueries: [{ query: FETCH_BOARDS }],
      update(cache, { data }) {
        //등록후 받은 결과물이 data로 들어오고 cache는 원래있던거
        cache.modify({
          //modify - 캐시 수정할때
          fields: {
            fetchBoards: (prev) => {
              //prev-현재까지 있던 데이터들
              return [data.createBoard, ...prev]; //새로등록한 데이터 + 원래있던데이터 10개
            },
          },
        });
      },
    });
  };

  console.log(data);

  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span>{el.title}</span>
          <span>{el.writer}</span>
          <button onClick={onClickDelete(el._id)}>삭제하기</button>
        </div>
      ))}
      <button onClick={onClickSubmit}>등록하기</button>
    </div>
  );
}
