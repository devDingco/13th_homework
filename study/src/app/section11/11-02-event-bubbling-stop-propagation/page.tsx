"use client";

import { useMutation, useQuery, gql } from "@apollo/client";

const FETCH_BOARDS = gql`
  query fetchBoards(
    $endDate: DateTime
    $startDate: DateTime
    $search: String
    $page: Int
  ) {
    fetchBoards(
      endDate: $endDate
      startDate: $startDate
      search: $search
      page: $page
    ) {
      _id
      writer
      title
      createdAt
    }
  }
`;

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

interface Board {
  _id: string;
  writer: string;
  title: string;
  createdAt: string;
}

export default function MapFruitsPage() {
  const result = useQuery<{ fetchBoards: Board[] }>(FETCH_BOARDS, {
    variables: {
      startDate: "2019-09-03T09:54:33Z",
      endDate: "2024-10-07T18:54:33Z",
      search: "",
      page: 1,
    },
  });

  console.log(result);
  // result 안에는 data, loading, error 등이 들어있다.
  const [deleteBoard] = useMutation(DELETE_BOARD);

  const onClickDelete = async (boardId: string) => {
    try {
      await deleteBoard({
        variables: { boardId },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const listItemClickHandler = (e: React.MouseEvent) => {
    console.log(`ID : ${e.currentTarget.id} 게시글입니다.`);
  };

  const checkBoxHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    const parentId = e.currentTarget.parentElement?.getAttribute("id");
    console.log("체크박스 클릭", parentId);
  };

  return (
    <div>
      <div className="flex gap-5 flex-col">
        {/*  idx의 경우 게시글을 삭제할 때 다음 게시글이 올라오면서 유지되므로 사실상 유일하지 않음 */}
        {/* 1. 특별한 이유가 없다면 Fragment로 감싼다. 대체 <></> */}
        {/* 2. key는 유일해야 한다. */}
        {/* 3. key값을 넣으려면  <Fragment key={el._id}></Fragment> 형태로 진행 */}
        <ul className="flex flex-col gap-3">
          {result.data?.fetchBoards.map((el: Board) => (
            <li
              key={el._id}
              id={el._id}
              className="flex gap-4 items-center"
              onClick={(e) => listItemClickHandler(e)}
            >
              <input type="checkbox" onClick={(e) => checkBoxHandler(e)} />
              <span>{el.writer}</span>
              <span>{el.title}</span>
              <span>{el.createdAt}</span>
              <button
                className="px-3 rounded-lg text-base-100 bg-primary"
                onClick={() => onClickDelete(el._id)}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
