"use client";
import { gql, useQuery, useApolloClient } from "@apollo/client";
import Link from "next/link";
import _ from "lodash";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
    }
  }
`;

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function Page() {
  const { data } = useQuery(FETCH_BOARDS);

  // 프리패치 디바운스 - 1초에 한번씩만 실행, 디바운스를 해주지 않으면 너무 많은 요청이 발생할 수 있다.
  const prefetchDebounce = _.debounce((boardId: string) => {
    client.query({
      query: FETCH_BOARD,
      variables: { boardId },
    });
  }, 1000);

  // 마우스 오버시 해당하는 게시글 상세 데이터 프리패치
  // 프리패치하게되면 페이지 접속시 바로 게시글 데이터(이미 캐시에 있으므로)를 가져올 수 있다.
  // 이미 캐시가 있는 경우 상세페이지 접속시 다시 쿼리를 날리지 않고 캐시에서 데이터를 가져온다.
  const client = useApolloClient();
  const prefetchBoard = (boardId: string) => () => {
    prefetchDebounce(boardId);
  };

  return (
    <div className="flex flex-col gap-3 items-start">
      {data?.fetchBoards.map((el) => (
        <div key={el._id} className="border">
          <Link
            href={`/section31/31-14-prefetch-moved/${el._id}`}
            onMouseOver={prefetchBoard(el._id)}
          >
            <span style={{ margin: "10px" }}>{el.writer}</span>
            <span style={{ margin: "10px" }}>{el.title}</span>
          </Link>
        </div>
      ))}
      <br />
    </div>
  );
}
