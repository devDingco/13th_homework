"use client";

import { useQuery, gql, useMutation } from "@apollo/client";
import { Button } from "antd";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
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

export default function StaticRoutedPage() {
  const { data } = useQuery(FETCH_BOARDS);

  const [deleteBoard] = useMutation(DELETE_BOARD);
  const [createBoard] = useMutation(CREATE_BOARD);

  const onClickDelete = async (boardId: string) => {
    await deleteBoard({
      variables: { boardId },
      // !!! 새로 api를 호출하지 않고 cache를 수정하여 삭제하기
      update(cache, { data }) {
        // cache.modify 를 사용하여 cache를 수정할 수 있다.
        cache.modify({
          fields: {
            // field를 사용하여 cache의 특정 필드를 수정할 수 있다.
            fetchBoards: (prev, { readField }) => {
              console.log(prev); // 현재 cache의 데이터
              // prev는 현재 cache의 데이터를 의미한다. readField를 사용하여 특정 필드의 값을 가져올 수 있다.
              // deleteBoard의 결과값은 id값 자체이므로 data.deletedBoard로 id값을 가져올 수 있다.
              const deletedId = data.deletedBoard; // 삭제 완료된 id값

              // const filterPrev = prev.filter((el) => deletedId !== el._id);
              // 위와 같이 사용하면 오류가 발생한다. readField를 사용하여 _id 값을 가져와야 한다.

              // 아래와 같은 형태로 filter를 사용하여 삭제된 id값을 제외한 나머지 데이터를 배열로 저장한다. 🔽
              console.log(readField("_id", prev[0]), deletedId); // _id 값 가져오기

              const filterPrev = prev.filter(
                (el) => deletedId !== readField("_id", el)
              );
              console.log(filterPrev); // 삭제 후 cache의 데이터
              return [...filterPrev];
            },
          },
        });
      },
    });
  };

  const onClickCreate = async () => {
    await createBoard({
      variables: {
        createBoardInput: {
          writer: "철수",
          password: "1234",
          title: "제목입니다~~",
          contents: "내용입니다@@@",
        },
      },
      update(cache, { data }) {
        cache.modify({
          fields: {
            fetchBoards(prev) {
              // 기존 캐시 데이터인 prev에 새로운 데이터인 data.createBoard를 추가하여 cache를 수정한다.
              return [data.createBoard, ...prev];
            },
          },
        });
      },
    });
  };

  return (
    <div className="flex flex-col gap-3 items-start">
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{ margin: "10px" }}>{el.writer}</span>
          <span style={{ margin: "10px" }}>{el.title}</span>
          <Button
            color="default"
            variant="solid"
            onClick={() => onClickDelete(el._id)}
          >
            삭제
          </Button>
        </div>
      ))}
      <br />
      <Button onClick={onClickCreate}>새로 등록하기</Button>
    </div>
  );
}
